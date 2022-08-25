const { ADD_COMMENT } = require('../query');

// Created expects bountyId and id. Makes a comment by Pat owner on issue with the bounty Id with a link to the bounty.
async function closed(authenticatedGraphQl, app) {
	app.post('/closed', async (req, res) => {
		try {
			const mutation = await authenticatedGraphQl(ADD_COMMENT, {
				id: req.body.bountyId,
				body: `This bounty at ${process.env.BASE_URL}/bounty/${req.body.bountyId}/${req.body.id} has been claimed by the author of this pull request: ${req.body.closerData}.`,
			});
			res.json(mutation);
		} catch (err) {
			console.error(err);
		}
		res.status(200).end();
	});
}

module.exports = closed;
