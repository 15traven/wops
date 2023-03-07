"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.hashPassword = exports.generatePassword = void 0;
var crypto_1 = require("crypto");
/**
 * @typedef {Object} HashAndSalt
 * @property {string} hash - The hash we got
 * @property {string} salt - The salt used for hashing
 * */
/**
  * @param {string} length
  * @param {boolean} useSpecial
  * @returns {string} password
 * */
var generatePassword = function (length, useSpecial) {
    var leters = "abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";
    var special = "~`!@#$%^&*()_-+={[}]|\:;'<,>.?/";
    var pswd = '';
    if (useSpecial) {
        var charset = leters + numbers + special;
        for (var i = 0; i < length; i++) {
            pswd += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return pswd;
    }
    else {
        var charset = leters + numbers;
        for (var i = 0; i < length; i++) {
            pswd += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return pswd;
    }
};
exports.generatePassword = generatePassword;
/**
 * Given a Password, hash it with a salt, then return the hash and the salt
 * @param {string} pswd
 * @return {HashAndSalt} object containing the hash and the salt used
 * */
var hashPassword = function (pswd) {
    var salt = (0, crypto_1.randomBytes)(16).toString("hex");
    var hash = (0, crypto_1.pbkdf2Sync)(pswd, salt, 1000, 64, "sha512").toString("hex");
    return { hash: hash, salt: salt };
};
exports.hashPassword = hashPassword;
/**
 * Given an input password a salt and an hash
 * Does the given password match with the hash?
 * @param {string} inpPswd
 * @param {string} salt
 * @param {string} storedHash
 * @returns {boolean} does hash(inpPswd + salt) === storedHash?
 * */
var validatePassword = function (inpPswd, salt, storedHash) {
    var inputHash = (0, crypto_1.pbkdf2Sync)(inpPswd, salt, 1000, 64, "sha512").toString("hex");
    return storedHash === inputHash;
};
exports.validatePassword = validatePassword;
