const { Page } = require('../../models/index')

module.exports = {
	pages: async () => {
		var pages = await Page.find()
		var res = []
		pages.forEach(page => {
			let { url, visitorCount, visitorCountUnique, visits } = page
			var gqlPage = {
				_id: url,
				visitorCount,
				visitorCountUnique,
				visits
			}
			res.push(gqlPage)
		})
		return res
	},

	page: async ({url}) => {
		var page = await Page.findOne({ url })
		if(!page) {
			return null
		}
		let { visitorCount, visitorCountUnique, visits } = page
		return {
			_id: url,
			visitorCount,
			visitorCountUnique,
			visits
		}
	},

	addVisit: async ({ url }, req) => {
		var { ip } = req
		var date = Date.now().toString()
		var oldPage = await Page.findOne({ url })
		var newVisit = { ip, date }

		if(!oldPage) {
			var newPageBase = {
				visitorCount: 1,
				visitorCountUnique: 1,
				visits: [newVisit]
			}
			await Page.create(Object.assign({ url }, newPageBase))
			return Object.assign({ _id: url }, newPageBase)
		}

		var isUniqueVisit = oldPage.visits.findIndex(v => v.ip == ip) == -1
		var newPage = {
			visitorCount: oldPage.visitorCount + 1,
			visitorCountUnique: oldPage.visitorCountUnique + (isUniqueVisit ? 1 : 0),
			visits: [...oldPage.visits, newVisit]
		}

		await Page.findOneAndUpdate({ url }, newPage)
		return Object.assign({ _id: url }, newPage)
	}
}