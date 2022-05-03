const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
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
	router.use(cors({ origin: process.env.BASE_URL }));
	created(appOctokit, router, user);
	funded(appOctokit, router, user);
	refunded(appOctokit, router, user);
};
