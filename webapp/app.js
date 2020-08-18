require('dotenv/config')

const port = process.env.PORT || 3000;

const fetch = require("node-fetch")
const express = require("express")
const app = express()

// Set UI5 page
app.use(express.static(__dirname))
app.get('', (req, res) => res.sendfile('index.html'))

// Set API page
app.get("/api/search", async (req, res) => {
    try {
        // It uses node-fetch to call the goodreads api, and reads the key from .env     
        const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.s}`)
          
        const json = await response.text()
        
        const results = JSON.parse(json)
        return res.json(results)
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message, })
    }
})

// Start server
app.listen(port, () => console.log(`Listening on port ${port}!`))
