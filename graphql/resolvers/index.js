const { Page } = require('../../models/index')

module.exports = {
	pages: () => {
		return [
			{
				_id: 'id1',
				visitorCount: 10,
				visitorCountUnique: 5,
				visits: [
					{ ip: '127.0.0.1', date: 'date string' }
				]
			}
		]
	},

	addVisit: ({ visitInput }) => {
		console.log('update on database')
		return visitInput
	}
}