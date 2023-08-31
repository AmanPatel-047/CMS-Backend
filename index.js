const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require("./models/user.js")
const TableData = require("./models/tabledata.js")

const app = express()
app.use(express.json())
app.use(cors()) 
 
mongoose.connect("mongodb://localhost:27017/CMS")
.then(() => {
    console.log("Connected to database");
})
.catch(err => {
    console.error("Database connection error:", err);
});  

// login API
app.post('/login', (req, res) => {
    const { email, password } = req.body; 
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                } 
            } else {
                    console.log(req.body);
                    res.json(req.body)
                }
            })
})


// Register API
app.post('/', (req, res) => {
    UserModel.create(req.body)
        .then(Users => res.json(Users))
        .catch(err => res.json(err))
})


// Table Data Get API
app.get('/blog', async (req, res) => {
    try {
      // Use async/await to fetch data from the database
      const data = await TableData.find({}, 'title author publishOn');
      
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found.' });
      }
  
      const modifiedData = data.map((entry, index) => ({
        No: index + 1,
        Title: entry.title,
        Author: entry.author,
        PublishOn: entry.publishOn
      }));
  
      const columns = ['No', 'Title', 'Author', 'PublishOn'];
  
      res.json({ data: modifiedData, columns });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  });

// Table Data Post API
app.post('/addblog', (req, res) => {
    TableData.create(req.body)
        .then(tabledata => res.json(tabledata))
        .catch(err => res.json(err))
}) 
  
// Table Data Delete API
app.delete('/blog/:rowNo', async (req, res) => {
    try {
      const { rowNo } = req.params;
      const data = await TableData.find({}, '_id');
  
      if (data.length < rowNo) {
        return res.status(404).json({ error: 'Row not found.' });
      }
  
      const blogToDeleteId = data[rowNo - 1]._id;
      await TableData.findByIdAndDelete(blogToDeleteId);
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "An error occurred while deleting data." });
    }
  });
  


  
app.listen(3001, () => {
    console.log("server is running")
})