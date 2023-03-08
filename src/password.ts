import { randomBytes, pbkdf2Sync } from 'crypto'

/**
 * @typedef {Object} HashAndSalt
 * @property {string} hash - The hash we got
 * @property {string} salt - The salt used for hashing
 * */

const generateCharset = (
  useUpper: boolean, 
  useNumbers: boolean,
  useSpecial: boolean
):string => {
  let charset = 'abcdefghijklmnoprstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const special = '~`!@#$%^&*()_-+={[}]|:;\"\'<,>.?/'

  if (useUpper) { charset += upper }
  if (useNumbers) { charset += numbers }
  if (useSpecial) { charset += special }

  return charset
}

/**
 * Generates a password according to the specified parameters
 * @param {string} length
 * @param {boolean} useUpper
 * @param {boolean} useNumber
 * @param {boolean} useSpecial
 * @returns {string} password
 * */
export const generatePassword = (
  length: number,
  useUpper: boolean,
  useNumber: boolean,
  useSpecial: boolean
): string => {
  const charset = generateCharset(useUpper, useNumber, useSpecial)
  let pswd = ''

  for (let i = 0; i < length; i++) {
    pswd += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return pswd
}

/**
 * Given a Password, hash it with a salt, then return the hash and the salt
 * @param {string} pswd
 * @return {HashAndSalt} object containing the hash and the salt used
 * */
export const hashPassword = (
  pswd: string
): {
  hash: string
  salt: string
} => {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(pswd, salt, 1000, 64, 'sha512').toString('hex')

  return { hash, salt }
}

/**
 * Given an input password a salt and an hash
 * Does the given password match with the hash?
 * @param {string} inpPswd
 * @param {string} salt
 * @param {string} storedHash
 * @returns {boolean} does hash(inpPswd + salt) === storedHash?
 * */
export const validatePassword = (
  inpPswd: string,
  salt: string,
  storedHash: string
): boolean => {
  const inputHash = pbkdf2Sync(inpPswd, salt, 1000, 64, 'sha512').toString(
    'hex'
  )

  return storedHash === inputHash
}

enum PasswordStrengthVariants {
  VeryWeak = 'very weak',
  Weak = 'weak',
  Moderate = 'moderate',
  Strong = 'strong',
  VeryStrong = 'very strong'
}

/**
 * The checkPasswordStrength function checks how strong the entered password is
 * @param {string} pswd
 * */
export const checkPasswordStrength = (pswd: string):PasswordStrengthVariants => {
  let score = 0

  if (pswd.length >= 8) { score++ }

  const hasLowercase = /[a-z]/.test(pswd)
  if (hasLowercase) { score++ }

  const hasUppercase = /[A-Z]/.test(pswd)
  if (hasUppercase) { score++ }

  const hasDigit = /\d/.test(pswd)
  if (hasDigit) { score++ }

  const hasSpecialChar = /[^a-zA-Z\d]/.test(pswd)
  if (hasSpecialChar) { score++ }

  let passwordStrength = ''
  switch (score) {
    case 0:
    case 1: return PasswordStrengthVariants.VeryWeak
    case 2: return PasswordStrengthVariants.Weak
    case 3: return PasswordStrengthVariants.Moderate
    case 4: return PasswordStrengthVariants.Strong
    case 5: return PasswordStrengthVariants.VeryStrong
    default: let passwordStrength = ''
  }
}
