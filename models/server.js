require('dotenv').config();
const express = require('express');
const cors = require('cors');

const loginRoutes = require('../routes/login');
const userRouter = require('../routes/user');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.loginPath = '/api/login';
    this.usersPath = '/api/users';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.loginPath, loginRoutes);
    this.app.use(this.usersPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
