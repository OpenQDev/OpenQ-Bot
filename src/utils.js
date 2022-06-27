// Mapping of tokens with token metadata for token address lookup
const polygonMainnetTokenMetadata = require('../tokens/polygon-mainnet.json');
const localTokenMetadata = require('../tokens/local.json');

const selectTokenMetadata = () => {
	let tokenMetadata;
	switch (process.env.DEPLOY_ENV) {
		case 'docker':
			tokenMetadata = localTokenMetadata;
			break;
		case 'localhost':
			tokenMetadata = localTokenMetadata;
			break;
		case 'production':
			tokenMetadata = polygonMainnetTokenMetadata;
			break;
		default:
			throw Error('NO CORRECT NETWORK');
	}

	return tokenMetadata;
};

module.exports = selectTokenMetadata;
