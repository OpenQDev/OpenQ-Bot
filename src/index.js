const bodyParser = require('body-parser');
const express = require('express');
const { Octokit } = require('octokit');
const dotenv = require('dotenv');
const created = require('./created');
const funded = require('./funded');
const refunded = require('./refunded');

module.exports = async function Probot(app, { getRouter }) {
	dotenv.config();
	const appOctokit = new Octokit({ auth: process.env.PAT });
	const user = process.env.PAT;
	const router = getRouter('/');
	router.use(bodyParser.urlencoded({ extended: true }));
	router.use(express.json());
	router.use((req, res, next) => {
		console.log(req.headers.authorization);
		if (!req.headers.authorization) {
			return res.status(403).json({ error: 'No credentials sent!' });
		} else {
			console.log(req.headers);
			if (req.headers.authorization == 'a5d5a4d787f816faabc4738588e8d919bd1a41cf80f8e02685f842b0f2bd49c2') {
				next();
			} else {
				return res.status(401).json({ error: 'Invalid Credentials' });
			}
		}
	});
	created(appOctokit, router, user);
	funded(appOctokit, router, user);
	refunded(appOctokit, router, user);
};
