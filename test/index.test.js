const nock = require('nock');
// Requiring our app implementation
const openQBot = require('../src/index');
const { Probot, ProbotOctokit } = require('probot');
// Requiring our fixtures
const payload = require('./fixtures/issues.opened');
const issueCreatedBody = { body: 'Thanks for opening this issue!' };

describe('My Probot app', () => {
	let probot;

	beforeEach(() => {
		nock.disableNetConnect();
		probot = new Probot({
			githubToken: 'test',
			// Disable throttling & retrying requests for easier testing
			Octokit: ProbotOctokit.defaults({
				retry: { enabled: false },
				throttle: { enabled: false },
			}),
		});
		openQBot(probot);
	});

	test('creates a passing check', async () => {
		// Test that we correctly return a test token
		nock('https://api.github.com')
			.post('/app/installations/2/access_tokens')
			.reply(200, { token: 'test' });

		// Test that a comment is posted
		nock('https://api.github.com')
			.post('/repos/hiimbex/testing-things/issues/1/comments', (body) => {
				expect(body).toMatchObject(issueCreatedBody);
				return true;
			})
			.reply(200);

		// Receive a webhook event
		await probot.receive({ name: 'issues', payload });
	});

	afterEach(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});
});