const db = require('../database/config');

const index = async(req,res) => {
    try{
        const [continentsData] = await db.query("select * from continents");
        res.json(continentsData);

    }catch(error){
        console.error("Error Fetching Continents", error);
        res.status(500).json({message: "Database conection error"})
        
    }
}

// create New Continent
const create = async(req, res) => {
    const {continent_name, continent_img} = req.body;
    console.log("recive create continent data", {continent_name, continent_img});
    
    try{
        const [result]= await db.query("INSERT INTO continent (continent_name, continent_img) VALUES (?,?)", [continent_name, continent_img]);
        console.log("create continent result", result);
        
        res.json({continentId: result.insertId});
    }catch(error){
        console.error("Error creating continent", error);
        res.status(500).json({message: "database conection error"})
        
    }
}

module.exports = {
    index,
    create
}