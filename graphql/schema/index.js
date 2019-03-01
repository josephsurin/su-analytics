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

	type RootQuery {
		pages: [Page!]!
		page(url: String!): Page
	}

	type RootMutation {
		addVisit(url: String!): Page
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)