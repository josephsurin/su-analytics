const mongoose = require('mongoose')
const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')

const schema = require('./graphql/schema')
const rootValue = require('./graphql/resolvers')

app.enable('trust proxy')
app.use('/api', graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
}))

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/su-analytics'
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => {
		console.log('connected to db')
		const port = process.env.PORT || 4000
		app.listen(port, () => {
			console.log('server listening on port ', port)
		})
	})
