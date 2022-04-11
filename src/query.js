const ADD_COMMENT = `
mutation issue($id: ID!, $body: String!) {
	addComment(input: {subjectId: $id, body: $body}) {
		clientMutationId
	}

}
`;
module.exports = { ADD_COMMENT };
