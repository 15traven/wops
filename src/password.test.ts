import { checkPasswordStrength, hashPassword, validatePassword } from './password'

const PASSWORD = '12345'
const VERY_WEAK_PASSWORD = '1234567'
const WEAK_PASSWORD = '1qwerty'
const MODERATE_PASSWORD = '12345qwerty'
const STRONG_PASSWORD = '12345Qwerty'
const VERY_STRONG_PASSWORD = '!12345Qwerty'
const VALUES = {
  hash: '2c6dec7c357784de002795c9b771f5e50d1219fc2c3f1ad96f732f1ae532a666a49b3a732d6a3cf20ff734b21784b5c174c808ce5ce18a08a0179deec792d883',
  salt: 'a25354844920ff905464891c10a7490a',
  string: '1234',
  wrongString: 'admin1234'
}

describe('hashPassword', () => {
  test('hashPasword returns an object with hash', () => {
    const result = hashPassword(PASSWORD)
    expect(result).toHaveProperty('hash')
  })

  test('hashPassword returns an object with salt', () => {
    const result = hashPassword(PASSWORD)
    expect(result).toHaveProperty('salt')
  })
})

describe('validatePassword', () => {
  test('with correct password', () => {
    expect(validatePassword(VALUES.string, VALUES.salt, VALUES.hash)).toBe(true)
  })

  test('with wrong password', () => {
    expect(validatePassword(VALUES.wrongString, VALUES.salt, VALUES.hash)).toBe(
      false
    )
  })
})

describe('checkPasswordStrength', () => {
  test('with very weak password', () => {
    const result = checkPasswordStrength(VERY_WEAK_PASSWORD)
    expect(result).toBe('very weak')
  })

  test('with weak password', () => {
    const result = checkPasswordStrength(WEAK_PASSWORD)
    expect(result).toBe('weak')
  })

  test('with modered password', () => {
    const result = checkPasswordStrength(MODERATE_PASSWORD)
    expect(result).toBe('moderate')
  }) 

  test('with strong password', () => {
    const result = checkPasswordStrength(STRONG_PASSWORD)
    expect(result).toBe('strong')
  }) 

  test('with very strong password', () => {
    const result = checkPasswordStrength(VERY_STRONG_PASSWORD)
    expect(result).toBe('very strong')
  })
})
