
const db = require('../database/config');

const getCountriesByContinent = async(req,res) => {
    // const{continent} = req.params;
    try {
         const [countryData] = await db.query("select * from country");
        res.json(countryData)
        console.log("country Data", countryData);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
    
}

module.exports = {
    getCountriesByContinent
}