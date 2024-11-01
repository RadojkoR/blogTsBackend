const { json } = require('express');
const db = require('../database/config');

//NOVI BLOG KONTROLER IZ NOVE BAZE
//Get All blog Posts
const index = async(req,res) => {
    try {
        const [posts] = await db.query("select * from blog_posts");
        res.json(posts)
        console.log("blog_posts Data", posts);
        
    }catch(error){
        console.error("Error Fetching Countries:", error);
        res.status(500).json({message: "Database connection error"})
        
    }
}

//Create New Blog
const createNewBlog = async(req,res) => {
    const {title, content, continent_id, country_id} = req.body;
     console.log("Received data:", { title, content, continent_id, country_id });
    try{
        const [result] = await db.query("INSERT INTO blog_posts (title, content, continent_id, country_id, author_id) VALUES (?, ?, ?, ?, ?)", [title, content, continent_id, country_id, author_id]);
        res.status(201).json({ id: result.insertId, title, content, continent_id, country_id, author_id });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Database connection error" });
    }
}

//Get a single blog post by id

const getSingelBlog = async(req,res) => {
    try{
        const [post] = await db.query("SELECT * FROM blog_post WHERE post_id = ?", [id]);
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
        const [result] = await db.query("UPDATE blog_posts SET title = ?, content = ?, continent_id = ?, country_id = ?, author_id = ?, WHERE post_id = ?", [title, content, continent_id, country_id, author_id, id]);

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
    }catch(error){
        console.error("Error deleting blog post", error);
        res.status(500).json({message: "Database error"});
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(204).send()
    }
}

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
    createNewBlog,
    getSingelBlog,
    edit,
    deleteBlog
}