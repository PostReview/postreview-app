import { SecurePassword } from "blitz"
import securePassword from "secure-password"

export const hashPassword = async (password: string) => {
  return await SecurePassword.hash(password)
}

export const verifyPassword = async (hashedPassword: string | null, password: string | null) => {
  return await SecurePassword.verify(hashedPassword, password)
}

export async function generateCode(secret: string) {
  return await hashPassword(secret)
}

export async function verifyCode(code: string, secret: string | null) {
  try {
    const result = await verifyPassword(code, secret)
    return [securePassword.VALID, securePassword.VALID_NEEDS_REHASH].includes(result)
  } catch (error) {
    return false
  }
}
