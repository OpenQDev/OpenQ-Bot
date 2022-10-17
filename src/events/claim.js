const { ADD_COMMENT } = require('../query');

async function claim(authenticatedGraphQl, app) {
	app.post('/claim', async (req, res) => {
		try {
			const mutation = await authenticatedGraphQl(ADD_COMMENT, {
				id: req.body.bountyId,
				body: `This bounty at ${process.env.BASE_URL}/contract/${req.body.bountyId}/${req.body.id} has been claimed by the author of this pull request: ${req.body.closerData}.`,
			});
			res.json(mutation);
		} catch (err) {
			console.error(err);
		}
		res.status(200).end();
	});
}

module.exports = claim;
