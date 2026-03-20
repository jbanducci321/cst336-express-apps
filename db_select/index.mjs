import express from 'express';
import mysql from 'mysql2/promise';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using the POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "k2pdcy98kpcsweia.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "gmhoccg2uue6ds29",
    password: "vvjakq4zu7siihcs",
    database: "nm2pf20notjcum1m",
    connectionLimit: 10,
    waitForConnections: true
});



//routes
app.get('/', (req, res) => {
   res.render("home.ejs")
});

app.get("/allFemaleAuthors", async(req, res) => {
   try {
        let sql = `SELECT firstName, lastName 
        FROM authors 
        WHERE sex = 'F'`

        const [rows] = await pool.query(sql);
        res.render("allFemaleAuthors.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/allQuotesAlpha", async(req, res) => {
   try {
        let sql = `SELECT quote 
        FROM quotes 
        ORDER BY quote ASC`

        const [rows] = await pool.query(sql);
        res.render("allQuotesAlpha.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/allQuotesLife", async(req, res) => {
   try {
        let sql = `SELECT quote 
        FROM quotes 
        WHERE quote LIKE '%life%'`

        const [rows] = await pool.query(sql);
        res.render("allQuotesAlpha.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/allQuotesBetween", async(req, res) => {
   try {
        let sql = `SELECT quote, likes 
        FROM quotes 
        WHERE likes BETWEEN 50 AND 100`

        const [rows] = await pool.query(sql);
        res.render("allQuotesBetween.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/topQuotes", async(req, res) => {
   try {
        let sql = `SELECT quote, likes 
        FROM quotes 
        ORDER BY likes DESC
        LIMIT 3`

        const [rows] = await pool.query(sql);
        res.render("topQuotes.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/randomQuote", async(req, res) => {
   try {
        let sql = `SELECT quote 
        FROM quotes 
        ORDER BY RAND()
        LIMIT 1`

        const [rows] = await pool.query(sql);
        res.render("randomQuote.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/worstQuotes", async(req, res) => {
   try {
        let sql = `SELECT quote, likes 
        FROM quotes 
        ORDER BY likes ASC
        LIMIT 5`

        const [rows] = await pool.query(sql);
        res.render("worstQuotes.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/authorsPhotos", async(req, res) => {
   try {
        let sql = `SELECT portrait 
        FROM authors`

        const [rows] = await pool.query(sql);
        res.render("authorsPhoto.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/authorsPhotosMale", async(req, res) => {
   try {
        let sql = `SELECT portrait 
        FROM authors
        WHERE sex = "M"`

        const [rows] = await pool.query(sql);
        res.render("authorsPhotoMale.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/authorsPhotosFemale", async(req, res) => {
   try {
        let sql = `SELECT portrait 
        FROM authors
        WHERE sex = "F"`

        const [rows] = await pool.query(sql);
        res.render("authorsPhotoFemale.ejs", {rows});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest


app.listen(3000, ()=>{
    console.log("Express server running")
})
