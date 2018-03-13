const elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elastic:9200',
  password: process.env.ELASTIC_PASSWORD,
  log: 'trace'
});

module.exports = client;