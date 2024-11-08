
const db = require('../database/config');

const index = async(req,res) => {
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

// Create New Country
const create = async (req,res) => {
    const {country_name, continent_id} = req.body;
    console.log("before bd call");
    
    try{
        const [result]= await db.query("INSERT INTO country (country_name, continent_id) VALUES (?,?)", [country_name, continent_id]);
        res.json({countryId: result.insertId, country_name, continent_id})
    }catch(error){
        console.error("Error creating Country", error);
        res.status(500).json({message: "Database Countries connection error"});
        
    }
}

module.exports = {
    index,
    create
}