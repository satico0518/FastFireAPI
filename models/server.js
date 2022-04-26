require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const authRoutes = require('../routes/auth');
const userRouter = require('../routes/user');
const turnRouter = require('../routes/turn');
const uploadsRouter = require('../routes/uploads');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
  
    this.authPath = '/api/auth/';
    this.usersPath = '/api/users';
    this.turnsPath = '/api/turns';
    this.uploadsPath = '/api/uploads';

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
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.usersPath, userRouter);
    this.app.use(this.turnsPath, turnRouter);
    this.app.use(this.uploadsPath, uploadsRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`FF API listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
