const db = require('../database/config');

const index = async(req,res) => {
    try {
        const [posts] = await db.query("select * from blog_posts");
        res.json(posts);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
}

module.exports = {
    index
}