const db = require('../database/config');

const index = async(req,res) => {
    try{
        const [continentsData] = await db.query("select * from continents");
        console.log('Continents data', continentsData);
        
        res.json(continentsData);

    }catch(error){
        console.error("Error Fetching Continents", error);
        res.status(500).json({message: "Database conection error"})
        
    }
}

module.exports = {
    index
}