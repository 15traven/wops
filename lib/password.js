"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.hashPassword = exports.generatePassword = void 0;
var crypto_1 = require("crypto");
/**
 * @typedef {Object} HashAndSalt
 * @property {string} hash - The hash we got
 * @property {string} salt - The salt used for hashing
 * */
var generateCharset = function (useUpper, useNumbers, useSpecial) {
    var charset = 'abcdefghijklmnoprstuvwxyz';
    var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numbers = '0123456789';
    var special = '~`!@#$%^&*()_-+={[}]|:;\"\'<,>.?/';
    if (useUpper) {
        charset += upper;
    }
    if (useNumbers) {
        charset += numbers;
    }
    if (useSpecial) {
        charset += special;
    }
    return charset;
};
/**
 * Generates a password according to the specified parameters
 * @param {string} length
 * @param {boolean} useUpper
 * @param {boolean} useNumber
 * @param {boolean} useSpecial
 * @returns {string} password
 * */
var generatePassword = function (length, useUpper, useNumber, useSpecial) {
    var charset = generateCharset(useUpper, useNumber, useSpecial);
    var pswd = '';
    for (var i = 0; i < length; i++) {
        pswd += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return pswd;
};
exports.generatePassword = generatePassword;
/**
 * Given a Password, hash it with a salt, then return the hash and the salt
 * @param {string} pswd
 * @return {HashAndSalt} object containing the hash and the salt used
 * */
var hashPassword = function (pswd) {
    var salt = (0, crypto_1.randomBytes)(16).toString('hex');
    var hash = (0, crypto_1.pbkdf2Sync)(pswd, salt, 1000, 64, 'sha512').toString('hex');
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
    var inputHash = (0, crypto_1.pbkdf2Sync)(inpPswd, salt, 1000, 64, 'sha512').toString('hex');
    return storedHash === inputHash;
};
exports.validatePassword = validatePassword;
