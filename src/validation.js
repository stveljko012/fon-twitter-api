const Joi = require('joi');

const createUserPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
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

module.exports = {
    createUserPayloadSchema,
    createTweetPayloadSchema,
    createCommentPayloadSchema
};