import express from 'express';
import http from '../services/http';
import api from '../services/busAPI';

const router = express.Router();
const util = require('util')

router.get('/', async (req, res, next) => {
    try {
        let r = await api.load();
        res.json(r);
    }
    catch(e) {
        console.log(util.inspect(e, false, null))

        res.json(util.inspect(e, false, null));
    }
});

module.exports = router;
