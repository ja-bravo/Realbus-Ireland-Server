const axios = require('axios');

const client = axios.create({
    baseURL: 'https://data.dublinked.ie/cgi-bin/rtpi',
});

module.exports = client;
