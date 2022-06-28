const bodyParser = require('body-parser');
const express = require('express');
const { Octokit } = require('octokit');
const dotenv = require('dotenv');
const cors = require('cors');
const created = require('./created');
const funded = require('./funded');
const refunded = require('./refunded');
const closed = require('./closed');

module.exports = async function Probot(app, { getRouter }) {
	dotenv.config();
	const appOctokit = new Octokit({ auth: process.env.PAT });
	const user = process.env.PAT;
	const router = getRouter('/');
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
				return res.status(401).json({ error: 'Invalid Credentials' });
			}
		}
	});
	created(appOctokit, router, user);
	funded(appOctokit, router, user);
	refunded(appOctokit, router, user);
	closed(appOctokit, router, user);
};
