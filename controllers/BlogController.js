
const db = require('../database/config');

//NOVI BLOG KONTROLER IZ NOVE BAZE
//Get All blog Posts
const index = async(req,res) => {
    try {
        const [posts] = await db.query("select * from blog_posts");
        res.json(posts);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
}

//Create New Blog
const create = async(req,res) => {
    const {title, content, continent_id, country_id, author_id} = req.body;
     console.log("Received data:", { title, content, continent_id, country_id });
    try{
        const [result] = await db.query("INSERT INTO blog_posts (title, content, continent_id, country_id, author_id) VALUES (?, ?, ?, ?, ?)", [title, content, continent_id, country_id, author_id]);
        res.status(201).json({ blogId: result.insertId});
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Database connection error", error: error.message });
    }
}

//Get a single blog post by id
const getSingelBlog = async(req,res) => {
    const {id} = req.params;
    try{
        const [post] = await db.query("SELECT * FROM blog_posts WHERE post_id = ?", [id]);
        console.log("Post result:", post);
        if(post.length === 0) {
            return res.status(404).json({message: "Blog post not found"});
        }
        res.json(post[0]);

    } catch(error) {
        console.error("Error Fetching single blog post", error);
        res.status(500).json({message: "Database connection error"});
        
    }
}

//Edit a blog post
const edit = async (req,res) => {
    const {id} = req.params;
    const {post_id,title, content, continent_id, country_id, author_id, } = req.body;
    try{
        const [result] = await db.query("UPDATE blog_posts SET title = ?, content = ?, continent_id = ?, country_id = ?, author_id = ? WHERE post_id = ?", [title, content, continent_id, country_id, author_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json({ id, title, content, continent_id, country_id, author_id })
    }catch(error){
        console.error("Error editing blog post", error);
        res.status(500).json({message: "Database connection error"});
        
    }
}

//Delete a blog post
const deleteBlog = async(req,res) => {
    const {id} = req.params;
    try{
        const [result] =await db.query("DELETE FROM blog_posts WHERE post_id = ?", [id])
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(204).send()
    }catch(error){
        console.error("Error deleting blog post", error);
        res.status(500).json({message: "Database error"});    
    }
}

const getBlogsByCountry = async (req, res) => {
    // Log za proveru da li je API pozvan
    console.log("Received request to fetch blogs by country");

    const { country_id } = req.query;  // Uzimamo country_id iz query stringa
    console.log(country_id);
    
    if (!country_id) {
        console.log("No country_id provided");
        return res.status(400).json({ message: "country_id parameter is required." });
    }

    console.log(`Fetching blogs for country_id: ${country_id}`); // Log za proveru šta dolazi u upit

    try {
        const [blogs] = await db.query("SELECT * FROM blog_posts WHERE country_id = ?", [country_id]);
        console.log(blogs);
        
        if (blogs.length === 0) {
            console.log("No blogs found for this country.");
            return res.status(404).json({ message: "No blogs found for the provided country_id." });
        }

        console.log("Blogs found:", blogs); // Log rezultata iz baze
        res.json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs for country", error);
        res.status(500).json({ message: "Database connection error" });
    }
};

// const getBlogsByCountry = async (req, res) => {
//     const { id } = req.params;
//     console.log("country is", id);
    
//     try {
//         const [post] = await db.query("SELECT * FROM blog_posts WHERE country_id = ?", [id]);
//         console.log("Post result:", post);
//         if (post.length === 0) {
//             return res.status(404).json({ message: "Blog post not found" });
//         }
//         res.json(post[0]);

//     } catch (error) {
//         console.error("Error Fetching single blog post", error);
//         res.status(500).json({ message: "Database connection error" });

//     }
// }

// const index = async(req,res) => {
//     try {
//          const [blogData] = await db.query("select * from blogs");
//         res.json(blogData)
//         console.log("blogs Data", blogData);
        
//     }catch(error){
//         console.error("Error Fetching Countries:", error);
//         res.status(500).json({message: "Database connection error"})
        
//     }
// }

module.exports = {
    index,
    create,
    getSingelBlog,
    edit,
    deleteBlog,
    getBlogsByCountry
}