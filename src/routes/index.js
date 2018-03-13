const express = require('express');
const http = require('../services/http');
const api = require('../services/busAPI');
const elastic = require('../services/elastic');

const router = express.Router();
const util = require('util');

router.get('/load', async (req, res, next) => {
    try {
        const r = await elastic.get({type: 'operator', id: 'BE', index: 'operators'});
        res.json(r);
        // const r = await api.load();
        // res.json(r);
    } catch (e) {
        console.log(util.inspect(e, false, null));

        res.json(util.inspect(e, false, null));
    }
});

module.exports = router;
