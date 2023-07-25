import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// js前端RSA加密
export const jsRsaEncrypt = (data) => {
  let encryptor = new JSEncrypt()
  let publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOQ0qopP5dY5sSovozq7kU4qRg
  9fsh8aVm38o2R5XiI3jSdXoiPmLfX5Rrr9PYJu2HShCAyOAWBfPEz6aaR+lAS8oq
  Llk4Bh6nD4wEXVXXUBLyoR7/a+Lrskn2WrgkSVI0XifnlEb6FiLgEdw76GDVV1GX
  30wTrTd7Afb5OAC/KwIDAQAB`
  encryptor.setKey(publicKey)
  return encryptor.encrypt(data)
}
