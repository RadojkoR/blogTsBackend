const db = require('../database/config');

const getCountriesByContinent = async(res,req) => {
    console.log("Request parameters:", req.params);
}

module.exports = {
    getCountriesByContinent
}