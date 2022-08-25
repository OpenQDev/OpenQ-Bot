const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const created = require('./created');
const funded = require('./funded');
const refunded = require('./refunded');
const closed = require('./closed');
const dotenv = require('dotenv');
const { graphql } = require('@octokit/graphql');

dotenv.config();

const authenticatedGraphQl = graphql.defaults({
	headers: {
		authorization: `token ${process.env.PAT}`,
	},
});

const router = express();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors({
	origin: ['http://localhost:8075'],
}));
router.use((req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	} else {
		if (req.headers.authorization == process.env.GITHUB_BOT_SECRET) {
			next();
		} else {
			console.log('req.headers.authorization', req.headers.authorization);
			console.log('process.env.GITHUB_BOT_SECRET', process.env.GITHUB_BOT_SECRET);
			return res.status(401).json({ error: 'Invalid Credentials' });
		}
	}
});

created(authenticatedGraphQl, router);
funded(authenticatedGraphQl, router);
refunded(authenticatedGraphQl, router);
closed(authenticatedGraphQl, router);

router.listen(process.env.PORT);

console.log(`Listening on ${process.env.PORT}`);