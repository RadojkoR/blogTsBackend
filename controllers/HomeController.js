const db = require("../database/config");
const index = async (req, res) => {
    try{
        const [adminData] = await db.query("select * from admin_data");
        const [continentsData] = await db.query("select * from continents");
        const [countyData] = await db.query("select * from country");
        const [blogsData] = await db.query("select * from blogs");
        const [blogPostsData] = await db.query("select * from blog_posts");
        console.log("Blog Posts Data", blogPostsData);
        
        console.log({adminData,continentsData,countyData,blogsData, blogPostsData});
        res.json({adminData, continentsData, countyData, blogsData, blogPostsData});
    } catch(error){
        console.error("Error connecting to database:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
}

module.exports = {
    index
}