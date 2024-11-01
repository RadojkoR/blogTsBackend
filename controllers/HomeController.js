const db = require("../database/config");
const index = async (req, res) => {
    try{
        const [adminData] = await db.query("select * from admin_data");
        const [continentsData] = await db.query("select * from continents");
        const [countyData] = await db.query("select * from country");
        const [blogsData] = await db.query("select * from blogs");
        const [blog_posts] = await db.query("select * from blog_posts");
        console.log({adminData,continentsData,countyData,blogsData, blog_posts});
        res.json({adminData, continentsData, countyData, blogsData, blog_posts});
    } catch(error){
        console.error("Error connecting to database:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
    
    // db.query("SELECT * FROM admin_data", (err, data)=>{
    //     console.log(data);
        
    //     res.send(data);
    // });
}

module.exports = {
    index
}