const { buildSchema } = require('graphql')

module.exports = buildSchema(`
	type Visit {
		ip: String
		date: String!
	}

	type Page {
		_id: ID!
		visitorCount: Int!
		visitorCountUnique: Int!
		visits: [Visit]
	}

	input VisitInput {
		ip: String
		date: String!
	}

	type RootQuery {
		pages: [Page!]!
	}

	type RootMutation {
		addVisit(visitInput: VisitInput): Visit
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)