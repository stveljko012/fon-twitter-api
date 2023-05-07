const express = require('express');
const { MongoClient } = require('mongodb');
const {
    createUserPayloadSchema,
    createTweetPayloadSchema,
    createCommentPayloadSchema,
} = require('./validation');
const { transform } = require('./utils');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const url =
    'mongodb+srv://master_user:rua.vyj8hnt1YEV1qza@fon.tc03ovy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'fon-twitter';

// TODO: CHALLANGE: PAGINATION FOR POSTS ON THE HOME PAGE

async function main() {
    await client.connect();
    const db = client.db(dbName);

    // USERS
    app.get('/api/users', async (req, res) => {
        const users = await db.collection('users').find({}).toArray();
        res.status(200).send(users.map(transform));
    });

    app.post('/api/users', async (req, res) => {
        const { body } = req;
        const { value: payload, error } =
            createUserPayloadSchema.validate(body);

        if (error) {
            res.status(400).send(error.details);
            return;
        }

        const result = await db.collection('users').insertOne(payload);
        const created = await db
            .collection('users')
            .findOne({ _id: result.insertedId });

        res.status(201).send(transform(created));
    });

    // TWEETS
    app.get('/api/tweets', async (req, res) => {
        const tweets = await db.collection('tweets').find({}).toArray();
        res.status(200).send(tweets.map(transform));
    });

    app.post('/api/tweets', async (req, res) => {
        const { body } = req;
        const { value: payload, error } =
            createTweetPayloadSchema.validate(body);

        if (error) {
            res.status(400).send(error.details);
            return;
        }

        const result = await db.collection('tweets').insertOne(payload);
        const created = await db
            .collection('tweets')
            .findOne({ _id: result.insertedId });

        res.status(201).send(transform(created));
    });

    // COMMENTS
    app.get('/api/comments', async (req, res) => {
        const comments = await db.collection('comments').find({}).toArray();
        res.status(200).send(comments.map(transform));
    });

    app.post('/api/comments', async (req, res) => {
        const { body } = req;
        const { value: payload, error } =
            createCommentPayloadSchema.validate(body);

        if (error) {
            res.status(400).send(error.details);
            return;
        }

        const result = await db.collection('comments').insertOne(payload);
        const created = await db
            .collection('comments')
            .findOne({ _id: result.insertedId });

        res.status(201).send(transform(created));
    });

    app.use('*', (req, res) => {
        res.status(404).send();
    });

    app.listen(3000);
}

main()
    .then(() => {
        console.log(`Application is listening on port: ${PORT}`);
    })
    .catch((err) => {
        console.error(err);
    });
