import * as Joi from 'joi';

// Validate env config
export const configValidationSchema = Joi.object({
  DB_API_HOST: Joi.required(),
  DB_API_PORT: Joi.required(),
  DB_API_NAME: Joi.required(),
  DB_API_USER: Joi.required(),
  DB_API_PASSWORD: Joi.required(),
  DB_API_SYNCHRONIZE: Joi.required(),
  DB_ENV: Joi.required(),
  BACKEND_API_SERVER_PORT: Joi.required(),
  AUTH0_ISSUER_URL: Joi.required(),
  AUTH0_AUDIENCE: Joi.required(),
  DEV_POST_ASSETS_LOCATION: Joi.required(),
  DEV_PROFILE_ASSETS_LOCATION: Joi.required(),
  DEV_PHOTO_SEED: Joi.required(),
  LOG_DIRECTORY: Joi.required(),
});
