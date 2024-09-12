'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    // Insert seed data
    await queryInterface.bulkInsert('users', [
      {
        id_user: 1,
        nama: 'Admin User',
        nip: '123456789',
        email: 'admin@example.com',
        password: bcrypt.hashSync('adminpassword', salt), // Hashed password using bcrypt
        remember_token: null,
        role: 'admin',
        piket: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_user: 2,
        nama: 'Guru User',
        nip: '987654321',
        email: 'guru@example.com',
        password: bcrypt.hashSync('gurupassword', salt), // Hashed password using bcrypt
        remember_token: null,
        role: 'guru',
        piket: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_user: 3,
        nama: 'Guru User 2',
        nip: '987654322',
        email: 'guru2@example.com',
        password: bcrypt.hashSync('gurupassword', salt), // Hashed password using bcrypt
        remember_token: null,
        role: 'guru',
        piket: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Revert seed data
    await queryInterface.bulkDelete('users', null, {});
  }
};
