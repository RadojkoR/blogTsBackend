const db = require('../database/config');
const multer = require("multer");
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file ,cd) => {
        cd(null,"/home/radojko/blog/public/images/");
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname);
    }
});

const upload = multer({storage: storage})


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
    const {continent_id, country_name, country_img} = req.body;
    
    console.log("Received data:", req.body, req.file); // Prikazuje podatke i fajl
    
    try{
        const [result]= await db.query("INSERT INTO country (continent_id, country_name, country_img) VALUES (?,?,?)", [continent_id, country_name, country_img]);
        res.json({countryId: result.insertId, continent_id, country_name, country_img})
    }catch(error){
        console.error("Error creating Country", error);
        res.status(500).json({message: "Database Countries connection error"});
        
    }
}

module.exports = {
    index,
    create: [upload.single("countryImgFile"), create]
}