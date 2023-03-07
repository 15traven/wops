import { randomBytes, pbkdf2Sync } from 'crypto'

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
export const generatePassword = (
  length: number,
  useSpecial: boolean
): string => {
  const leters = 'abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const special = "~`!@#$%^&*()_-+={[}]|:;'<,>.?/"
  let pswd = ''

  if (useSpecial) {
    let charset = leters + numbers + special
    for (let i = 0; i < length; i++) {
      pswd += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    return pswd
  } else {
    let charset = leters + numbers
    for (let i = 0; i < length; i++) {
      pswd += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    return pswd
  }
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
