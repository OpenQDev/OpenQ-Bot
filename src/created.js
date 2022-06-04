const { ADD_COMMENT } = require('./query');

// Created expects bountyId and id. Makes a comment by Pat owner on issue with the bounty Id with a link to the bounty.
async function created(appOctokit, router) {
	router.post('/created', async (req, res) => {
		try {
			const mutation = await appOctokit.graphql(ADD_COMMENT, {
				id: req.body.bountyId,
				body: `A bounty has been minted for this issue at ${process.env.BASE_URL}/bounty/${req.body.bountyId}/${req.body.id}`,
			});
			res.json(mutation);
		} catch (err) {
			console.error(err);
		}
		res.status(200).end();
	});
}
module.exports = created;
