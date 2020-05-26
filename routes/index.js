const express = require('express');
const router = express.Router();

const moment = require('moment');
const _ = require('lodash');

const Url = require('../db/models/url');
const Log = require('../db/models/log');

router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        const logs = await Log.find();

        const prevHour = new Date().getHours() - 1;
        let groupedResults = _.groupBy(logs, result => moment(result['createdAt'], 'DD/MM/YYYY').startOf('hour').format('HH'));

        urls.forEach(url => {
            const prevData = groupedResults[prevHour];
            url.prevCount = prevData && prevData.length || 0
        });

        const chartData = Object.keys(groupedResults).map(item => {
            return {
                x: moment(item, 'HH:mm').format("HH:mm"),
                y: groupedResults[item].length
            }
        });

        res.render('index', {urls, chartData})
    } catch (e) {
        console.error(e)
    }
});

router.post('/shortUrls', async (req, res) => {
    try {
        const {body: {fullUrl}} = req;

        const url = await Url.findOne({fullUrl});

        if (!url)
            await Url.create({fullUrl});

        res.redirect('/')
    } catch (e) {
        console.error(e)
    }
});

router.get('/:shortUrl', async (req, res) => {
    try {
        const {params: {shortUrl}} = req;
        const url = await Url.findOne({shortUrl});
        if (url == null) return res.sendStatus(404);

        await Log.create({shortUrl});

        url.noOfVisits++;
        url.save();

        res.redirect(url.fullUrl)
    } catch (e) {
        console.error(e)
    }

});

module.exports = router;