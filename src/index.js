const bodyParser = require('body-parser');
const { Octokit } = require('octokit');
const dotenv = require('dotenv');
const created = require('./created');
const funded = require('./funded');
const refunded = require('./refunded');

module.exports = async function Probot(app, { getRouter }) {
    dotenv.config();
    const appOctokit = new Octokit({ auth: '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' });
    const user = process.env.PAT;
    const router = getRouter('/openq-bot');
    router.use(bodyParser.urlencoded({ extended: true }));

    created(appOctokit, router, user);
    funded(appOctokit, router, user);
    refunded(appOctokit, router, user);
};
