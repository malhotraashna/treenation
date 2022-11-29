import axios from 'axios';

const client = axios.create({
  baseURL: 'https://tree-nation.com/api'
});

export default client;
