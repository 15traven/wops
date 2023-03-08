"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var password_1 = require("./password");
var PASSWORD = '12345';
var VERY_WEAK_PASSWORD = '1234567';
var WEAK_PASSWORD = '1qwerty';
var MODERATE_PASSWORD = '12345qwerty';
var STRONG_PASSWORD = '12345Qwerty';
var VERY_STRONG_PASSWORD = '!12345Qwerty';
var VALUES = {
    hash: '2c6dec7c357784de002795c9b771f5e50d1219fc2c3f1ad96f732f1ae532a666a49b3a732d6a3cf20ff734b21784b5c174c808ce5ce18a08a0179deec792d883',
    salt: 'a25354844920ff905464891c10a7490a',
    string: '1234',
    wrongString: 'admin1234'
};
describe('hashPassword', function () {
    test('hashPasword returns an object with hash', function () {
        var result = (0, password_1.hashPassword)(PASSWORD);
        expect(result).toHaveProperty('hash');
    });
    test('hashPassword returns an object with salt', function () {
        var result = (0, password_1.hashPassword)(PASSWORD);
        expect(result).toHaveProperty('salt');
    });
});
describe('validatePassword', function () {
    test('with correct password', function () {
        expect((0, password_1.validatePassword)(VALUES.string, VALUES.salt, VALUES.hash)).toBe(true);
    });
    test('with wrong password', function () {
        expect((0, password_1.validatePassword)(VALUES.wrongString, VALUES.salt, VALUES.hash)).toBe(false);
    });
});
describe('checkPasswordStrength', function () {
    test('with very weak password', function () {
        var result = (0, password_1.checkPasswordStrength)(VERY_WEAK_PASSWORD);
        expect(result).toBe('very weak');
    });
    test('with weak password', function () {
        var result = (0, password_1.checkPasswordStrength)(WEAK_PASSWORD);
        expect(result).toBe('weak');
    });
    test('with modered password', function () {
        var result = (0, password_1.checkPasswordStrength)(MODERATE_PASSWORD);
        expect(result).toBe('moderate');
    });
    test('with strong password', function () {
        var result = (0, password_1.checkPasswordStrength)(STRONG_PASSWORD);
        expect(result).toBe('strong');
    });
    test('with very strong password', function () {
        var result = (0, password_1.checkPasswordStrength)(VERY_STRONG_PASSWORD);
        expect(result).toBe('very strong');
    });
});
