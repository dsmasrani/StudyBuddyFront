"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var profile_exports = {};
__export(profile_exports, {
  getProfileByUserId: () => getProfileByUserId,
  updateProfile: () => updateProfile
});
module.exports = __toCommonJS(profile_exports);
var import_supabaseConnect = require("../../supabaseConnect");
const supabase = (0, import_supabaseConnect.connect)();
const tableName = "user_keys";
function updateProfile(profile, userid, id) {
  return __async(this, null, function* () {
    console.log("PROFILE");
    console.log(profile);
    console.log(id);
    var output = {
      pinecone_env: profile.pinecone_env,
      pinecone_key: profile.pinecone_key,
      openai_key: profile.openai_key,
      index_name: profile.index_name,
      user_email: userid
    };
    console.log(output);
    const { data, error } = yield supabase.from(tableName).update(output).eq("id", id).select();
    if (error) {
      console.error("Error creating profile:", error.message);
      return null;
    }
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  });
}
function getProfileByUserId(user_id) {
  return __async(this, null, function* () {
    const { data, error } = yield supabase.from(tableName).select("*").eq("user_id", user_id).single();
    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }
    return data != null ? data : null;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getProfileByUserId,
  updateProfile
});
