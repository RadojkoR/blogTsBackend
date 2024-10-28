const db = require("../database/config");
const index = async (req, res) => {
    const [adminData] = await db.query("select * from admin_data");
    const [continentsData] = await db.query("select * from continents");
    const [countyData] = await db.query("select * from country");
    const [blogsData] = await db.query("select * from blogs");
    console.log({adminData,continentsData,countyData,blogsData});
    res.json({adminData, continentsData, countyData, blogsData});
    
    
    // db.query("SELECT * FROM admin_data", (err, data)=>{
    //     console.log(data);
        
    //     res.send(data);
    // });
}

module.exports = {
    index
}