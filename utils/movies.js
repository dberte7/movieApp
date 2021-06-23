const fetch = require('node-fetch');

const film = {
    getfilm: async url => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
}

module.exports = film;