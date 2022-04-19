require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/auth');
const userRouter = require('../routes/user');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = '/api/auth/';
    this.usersPath = '/api/users';

    this.startDB();
    this.middlewares();
    this.routes();
  }

  async startDB() {
      await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.usersPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
