export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'tampakan-tcc-dev-secret',
  accessTokenExpiry: 900,
  refreshTokenExpiry: 604800,
} as const
