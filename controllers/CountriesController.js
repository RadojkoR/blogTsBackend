const { json } = require('express');
const db = require('../database/config');

const getCountriesByContinent = async(res,req) => {
    const{continent} = req.params;
    try {
        const [countries] = await db.query("SELECT * FROM country WHERE continent = ?", [continent]);
        res,json(countries)
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
    
}

module.exports = {
    getCountriesByContinent
}