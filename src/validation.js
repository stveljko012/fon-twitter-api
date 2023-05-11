const Joi = require('joi');

const createUserPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().default(null),
    lastName: Joi.string().default(null),
});

const createTweetPayloadSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    hashtags: Joi.array().items(Joi.string()).default([]),
    userId: Joi.string().required(),
});

const createCommentPayloadSchema = Joi.object({
    userId: Joi.string().required(),
    tweetId: Joi.string().required(),
    content: Joi.string().required(),
});

const idParamsSchema = Joi.object({
    id: Joi.string().length(24),
});

module.exports = {
    createUserPayloadSchema,
    createTweetPayloadSchema,
    createCommentPayloadSchema,
    idParamsSchema
};
