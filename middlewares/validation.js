const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (
    validator.isURL(value, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
        "any.required": 'The "name" field is required',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
        "any.required": 'The "imageUrl" field is required',
      }),
      weather: Joi.string()
        .lowercase()
        .valid("hot", "warm", "cold")
        .required()
        .messages({
          "any.only": 'The "weather" field must be one of: hot, warm, cold',
          "string.empty": 'The "weather" field must be filled in',
          "any.required": 'The "weather" field is required',
        }),
    })
    .unknown(false),
});

const validateSignupBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
      "any.required": 'The "avatar" field is required',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
      "any.required": 'The "email" field is required',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field is required',
    }),
  }),
});

const validateSigninBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
      "any.required": 'The "email" field is required',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field is required',
    }),
  }),
});

const makeValidateId = (paramName) =>
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      [paramName]: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
          "string.length": `The "${paramName}" must be 24 hex chars`,
          "string.hex": `The "${paramName}" must be hexadecimal`,
          "any.required": `The "${paramName}" param is required`,
        }),
    }),
  });

const validateProfileUpdateBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field is required',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
      "any.required": 'The "avatar" field is required',
    }),
  }),
});

const validateItemId = makeValidateId("itemId");
const validateUserId = makeValidateId("userId");

module.exports = {
  validateURL,
  validateCardBody,
  validateSignupBody,
  validateSigninBody,
  validateItemId,
  validateUserId,
  validateProfileUpdateBody,
};
