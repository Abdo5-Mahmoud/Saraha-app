import CryptoJS from "crypto-js";
export const generateIncryption = ({
  plainText = "",
  secretKey = process.env.PhoneSecret,
}) => {
  const encryption = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  return encryption;
};

export const generateDecryption = ({
  cipherText = "",
  signature = process.env.PhoneSecret,
} = {}) => {
  const decoded = CryptoJS.AES.decrypt(cipherText, signature).toString(
    CryptoJS.enc.Utf8
  );
  return decoded;
};
