const { json } = require('express');
const db = require('../database/config');

const getCountriesByContinent = async(res,req) => {
    // const{continent} = req.params;
    try {
         const [countyData] = await db.query("select * from country");;
        res,json(countyData)
        console.log("country Data", countyData);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
    
}

module.exports = {
    getCountriesByContinent
}