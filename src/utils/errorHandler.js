exports.errorHandler = (error, req, res, next) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
        
        
    } 
    


    if (process.env.NODE_ENV === "dev") {
        return res.status(500).json({ error: err.message, stack: err.stack });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
}