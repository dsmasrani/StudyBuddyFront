"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var supabaseConnect_exports = {};
__export(supabaseConnect_exports, {
  connect: () => connect,
  getSupabaseClient: () => getSupabaseClient
});
module.exports = __toCommonJS(supabaseConnect_exports);
var import_supabase_js = require("@supabase/supabase-js");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function getSupabaseClient(options) {
  const { apiKey, projectUrl } = options;
  if (!apiKey || !projectUrl) {
    throw new Error("Supabase API key and project URL must be provided.");
  }
  console.log("Connecting to Supabase at", projectUrl);
  return (0, import_supabase_js.createClient)(projectUrl, apiKey);
}
function connect() {
  const supabase = getSupabaseClient({
    apiKey: process.env.PROJECT_KEY || "",
    projectUrl: process.env.PROJECT_URL || ""
  });
  return supabase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connect,
  getSupabaseClient
});
