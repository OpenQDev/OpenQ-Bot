const ethers = require('ethers');
const { ADD_COMMENT } = require('../query');
const selectTokenMetadata = require('../utils');
const polygonMetadata = require('../../tokens/polygon-mainnet-indexable.json');

// Funded expects bountyId, id, and the deposit Obj of the deposit being funded
// Makes a comment by Pat owner on issue with the bounty Id with a link to the bounty and the amount funded.
async function funded(authenticatedGraphQl, app) {
	app.post('/funded', async (req, res) => {
		const { deposit } = req.body;
		const openQMetadata = selectTokenMetadata();
		const token = openQMetadata[deposit.tokenAddress] || polygonMetadata[deposit.tokenAddress.toLowerCase()];
		const { decimals } = token;

		const formattedVolume = ethers.utils.formatUnits(deposit.tokenVolumes, decimals);
		const name = token.name;
		try {
			const mutation = await authenticatedGraphQl(ADD_COMMENT, {
				id: req.body.bountyId,
				body: `A deposit of  ${formattedVolume} ${name} was placed on this issue at ${process.env.BASE_URL}/contract/${req.body.bountyId}/${req.body.id}`,
			});
			res.json(mutation);
		} catch (err) {
			console.error(err);
		}
		res.status(200).end();
	});
}

module.exports = funded;
