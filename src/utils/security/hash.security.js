import bcrypt from "bcrypt";
export const generateHash = ({
  plainText = "",
  salt = process.env.SALT || 10,
} = {}) => {
  const hashPassword = bcrypt.hashSync(plainText, parseInt(salt));
  return hashPassword;
};
export const compareHash = ({ plainText = "", hashValue = "" } = {}) => {
  const result = bcrypt.compareSync(plainText, hashValue);
  return result;
};
