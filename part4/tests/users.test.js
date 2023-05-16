const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const dummyUsers = require("./dummyUsers");
