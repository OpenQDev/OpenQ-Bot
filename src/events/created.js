const { ADD_COMMENT } = require("../query");

// Created expects bountyId and id. Makes a comment by Pat owner on issue with the bounty Id with a link to the bounty.
async function created(authenticatedGraphQl, app) {
  app.post("/created", async (req, res) => {
    try {
      const mutation = await authenticatedGraphQl(ADD_COMMENT, {
        id: req.body.bountyId,
        body: `A contract has been minted for this issue at ${process.env.BASE_URL}/contract/${req.body.bountyId}/${req.body.id}`,
      });
      res.json(mutation);
    } catch (err) {
      console.error(err);
    }
    res.status(200).end();
  });
}
module.exports = created;
