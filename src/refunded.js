const ethers = require('ethers');
const { ADD_COMMENT } = require('./query');
const tokenMetadata = require('./local.json');

// Refunded expects bountyId, id, and the deposit Obj of the deposit being refunded
// Makes a comment by Pat owner on issue with the bounty Id with a link to the bounty and the amount refunded.
async function refunded(appOctokit, router) {
    router.post('/refunded', async (req, res) => {
        const deposit = JSON.parse(req.body.deposit);
        const token = tokenMetadata[deposit.tokenAddress];
        const bigNumberVolume = ethers.BigNumber.from(deposit.volume.toString());
        const decimals = parseInt(tokenMetadata[deposit.tokenAddress].decimals, 10);

        const formattedVolume = ethers.utils.formatUnits(bigNumberVolume, decimals);
        const { name } = token;
        try {
            const mutation = await appOctokit.graphql(ADD_COMMENT, {
                id: req.body.bountyId,
                body: `A deposit of  ${formattedVolume} ${name} was refunded on this issue at ${process.env.BASE_URL}/bounty/${req.body.id}`,
            });
            res.json(mutation);
        } catch (err) {
            console.error(err);
        }
        res.status(200).end();
    });
}
module.exports = refunded;
