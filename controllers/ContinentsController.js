const db = require('../database/config.js');

const index = async(req,res) => {
    try{
        const [continents] = await db.query("select * from continents");
        res.json(continents)
    }catch(error){
        console.error("Error Fetching Continents", error);
        res.status(500).json({message: "Database conection error"})
        
    }
}

module.exports = {
    index
}