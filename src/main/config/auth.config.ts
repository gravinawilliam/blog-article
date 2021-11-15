import envConfig from './env.config';

type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

const {
  jwt: { secret, algorithm, expiresIn, issuer },
} = envConfig;

const authConfig = {
  jwt: {
    secret,
    expiresIn,
    algorithm: algorithm as Algorithm,
    issuer,
  },
};

export default authConfig;
