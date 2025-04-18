import bcrypt from "bcrypt";
export const generateHash = ({
  plainText = "",
  salt = process.env.SALT,
} = {}) => {
  const hashPassword = bcrypt.hash(plainText, parseInt(salt));
  return hashPassword;
};
export const compareHash = ({ plainText = "", hashText = "" } = {}) => {
  const result = bcrypt.compareSync(plainText, hashText);
  return result;
};
