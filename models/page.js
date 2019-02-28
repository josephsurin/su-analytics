const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
	url: { type: String, unique: true },
	visitorCount: { type: Number, default: 0 },
	VisitorCountUnique: { type: Number, default: 0 },
	visits: [{
		ip: String,
		date: String
	}]
})

module.exports = mongoose.model('Page', pageSchema)