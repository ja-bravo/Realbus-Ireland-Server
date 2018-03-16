import { Client } from 'elasticsearch';

const opts: any = {
  host: 'elastic:9200',
  password: process.env.ELASTIC_PASSWORD,
  log: ['error','warning']
}
const client = new Client(opts);

export default client;