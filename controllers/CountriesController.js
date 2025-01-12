const db = require('../database/config');
const multer = require("multer");
const fs = require('fs');
const path = require("path");
const { log } = require('console');

const storage = multer.diskStorage({
    destination: (req, file ,cd) => {
        cd(null,"/home/radojko/blog/public/images/");
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname);
    }
});

const upload = multer({storage: storage});


const index = async(req,res) => {
    try {
         const [countryData] = await db.query("select * from country");
        res.json(countryData);
        console.log("country Data", countryData);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"});
        
    };
    
};

// Create New Country
const create = async (req,res) => {
    const {continent_id, country_name} = req.body;
    const country_img = req.file ? `/images/${req.file.filename}` : null;
    
    console.log("Received data:", req.body, req.file); // Prikazuje podatke i fajl
    
    try{
        const [result]= await db.query("INSERT INTO country (continent_id, country_name, country_img) VALUES (?,?,?)", [continent_id, country_name, country_img]);
        res.json({countryId: result.insertId, continent_id, country_name, country_img});
    }catch(error){
        console.error("Error creating Country", error);
        res.status(500).json({message: "Database Countries connection error"});
        
    };
};

//Delete Country
const deleteCountry = async (req,res) => {
    const { id }= req.params;
    try {
        const [blogs] = await db.query("SELECT * FROM blog_posts WHERE country_id = ?", [id])

        if (blogs.length > 0) {
            await db.query("DELETE FROM blog_posts WHERE country_id = ?", [id]);
            return res.status(200).json({
                message: `Country has ${blogs.length} associated blog(s).`,
                blogs: blogs, // Lista povezanih blogova
            });
        }

        const [result] = await db.query("DELETE FROM country WHERE country_id = ?", [id]);

        

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Country not found"});
        }
        res.status(204).send();
    }catch(error){
        console.error("Error Deleting Country", error);
        res.status(500).json({message: "Database connention error", error: error.message});       
    };
};

const getBlogsByCountry = async (req, res) => {
    const { country_id } = req.query; // Uzima countryId iz query stringa
    if (!country_id) {
        return res.status(400).json({ message: "country_id parameter is required." });
    }
    try {
        const [blogs] = await db.query("SELECT * FROM blog_posts WHERE country_id = ?", [country_id]);
        console.log(blogs);
        
        res.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs for country", error);
        res.status(500).json({ message: "Database connection error" });
    }
};

module.exports = {
    index,
    create: [upload.single("countryImgFile"), create],
    deleteCountry,
    getBlogsByCountry
}