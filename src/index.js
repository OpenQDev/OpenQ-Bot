const bodyParser = require('body-parser');
const { Octokit } = require('octokit');
const dotenv = require('dotenv');
const created = require('./created');
const funded = require('./funded');
const refunded = require('./refunded');

module.exports = async function Probot(app, { getRouter }) {
    dotenv.config();
    const appOctokit = new Octokit({
        auth: process.env.PAT,
    });

    const router = getRouter('/openq-bot');
    router.use(bodyParser.urlencoded({ extended: true }));

    created(appOctokit, router);
    funded(appOctokit, router);
    refunded(appOctokit, router);
};
