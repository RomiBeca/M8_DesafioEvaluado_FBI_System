import jwt from "jsonwebtoken";

export const generarToken = (user, secretKey, expiresIn) => {
  return jwt.sign({ data: user }, secretKey, { expiresIn });
};

export const verificarToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};
