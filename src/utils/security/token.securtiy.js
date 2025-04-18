import jwt from "jsonwebtoken";

export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE_USER,
  options = {},
} = {}) => {
  const token = jwt.sign(payload, signature, options);
  return token;
};

export const verifyToken = ({
  token = "",
  signature = process.env.TOKEN_SIGNATURE_USER,
} = {}) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};
