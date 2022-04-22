const ADD_COMMENT = `
mutation issue($id: ID!, $body: String!) {
	addComment(input: {subjectId: $id, body: $body}) {
		clientMutationId
		subject{
			id
		}
	}

}
`;
module.exports = { ADD_COMMENT };
