import axios from 'axios';

const apiKey = '08048f421b677ab3b373cd10c1f36b16';

const actions = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: apiKey,
  },
});

export default actions;
