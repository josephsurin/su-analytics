const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
	url: { type: String, unique: true },
	visitorCount: Number,
	visitorCountUnique: Number,
	visits: [{
		ip: String,
		date: String
	}]
})

module.exports = mongoose.model('Page', pageSchema)