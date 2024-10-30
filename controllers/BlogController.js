const { json } = require('express');
const db = require('../database/config');

const index = async(req,res) => {
    try {
         const [blogData] = await db.query("select * from blogs");
        res.json(blogData)
        console.log("blogs Data", blogData);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
}

module.exports = {
    index
}