const ADD_COMMENT = `
mutation comment($id: ID!, $body: String!) {
	ADD_COMMENT(input: {subjectId: $id, body: $body}) {
		clientMutationId
	}
}
`;
module.exports = { ADD_COMMENT };
