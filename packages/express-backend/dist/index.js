"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_profile = require("./models/postgres/profile");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json());
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.get("/api/profile/:userid", (req, res) => __async(exports, null, function* () {
  const { userid } = req.params;
  try {
    const profile = yield (0, import_profile.getProfileByUserId)(userid);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}));
app.post("/api/updateProfile/:userid/:id", (req, res) => __async(exports, null, function* () {
  const { userid, id } = req.params;
  const parsedId = parseInt(id, 10);
  const profile = req.body;
  try {
    const insertedProfile = yield (0, import_profile.updateProfile)(profile, userid, parsedId);
    if (insertedProfile) {
      res.status(201).json(insertedProfile);
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
