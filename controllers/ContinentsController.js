const db = require('../database/config');
const multer = require('multer')
const path = require('path');

const index = async(req,res) => {
    try{
        const [continentsData] = await db.query("select * from continents");
        res.json(continentsData);

    }catch(error){
        console.error("Error Fetching Continents", error);
        res.status(500).json({message: "Database conection error"})
        
    }
}

// Create New Continent
const create = async(req, res) => {
    const { continent_name, continent_img} = req.body;
    console.log('Received data:', req.body.continentsData); // Ovo će prikazati podatke koji dolaze u POST zahtevu
    if (!continent_name || !continent_img) {
        return res.status(400).json({ message: "Continent name is required." });
    }
    try {
        const [result] = await db.query("INSERT INTO continents (continent_name, continent_img) VALUES (?, ?)", [continent_name, continent_img]);
        res.json({ continentId: result.insertId, continent_name, continent_img });
    } catch (error) {
        console.error("Error creating continent:", error);
        res.status(500).json({ message: "Database connection error", error: error.message });
    }
};



//Delete Continent
const deleteContinent = async(req, res) => {
    const {id} = req.params;
    try{
        const [result]= await db.query("DELETE FROM continents WHERE continent_id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Continent not found" });
        }
        res.status(204).send()
    }catch(error){
        console.error("Error deleting continent", error);
        res.status(500).json({message: "Database conenction error"})
        
    }
}

module.exports = {
    index,
    create,
    deleteContinent
}