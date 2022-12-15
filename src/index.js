const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const created = require('./events/created');
const funded = require('./events/funded');
const refunded = require('./events/refunded');
const closed = require('./events/closed');
const dotenv = require('dotenv');
const { graphql } = require('@octokit/graphql');

dotenv.config();

const authenticatedGraphQl = graphql.defaults({
	headers: {
		authorization: `token ${process.env.PAT}`,
	},
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({
	origin: ['http://localhost:8075'],
}));

app.use((req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	} else {
		if (req.headers.authorization == process.env.GITHUB_BOT_SECRET) {
			next();
		} else {
			return res.status(401).json({ error: 'Invalid Credentials' });
		}
	}
});

created(authenticatedGraphQl, app);
funded(authenticatedGraphQl, app);
refunded(authenticatedGraphQl, app);
closed(authenticatedGraphQl, app);

app.listen(process.env.PORT);

console.log(`OpenQ-Bot Listening on ${process.env.PORT}`);