import axios from 'axios';

const client = axios.create({
    baseURL: 'https://data.dublinked.ie/cgi-bin/rtpi',
});

export default client;
