import jwt, { Secret, SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
};

const getJwtSecret = (): Secret => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não está configurado");
  }

  return secret;
};

export const assertJwtConfigured = (): void => {
  getJwtSecret();
};

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
  const secret = getJwtSecret();

  let options: SignOptions = {};

  const expiration = expiresIn;

  if (expiration) {
    options = {
      expiresIn: expiration as NonNullable<SignOptions["expiresIn"]>,
    };
  }

  return jwt.sign(payload, secret, options);
};

export const verifyJwt = (token: string) => {
  const secret = getJwtSecret();

  const payload = jwt.verify(token, secret);

  if (
    typeof payload !== "object" ||
    typeof payload.id !== "string" ||
    payload.id.length === 0 ||
    typeof payload.email !== "string" ||
    payload.email.length === 0
  ) {
    throw new Error("Payload do token JWT é inválido");
  }

  return payload as JwtPayload;
};
