const ensurAjaxRequest = (req, res, next) => {
    if (!req.xhr) {
        res.status(403).json({ message: "Forbidden : This endpoint can only be accessed via AJAX requests." });
    } else {
        next();
    }
}

module.exports = ensurAjaxRequest;