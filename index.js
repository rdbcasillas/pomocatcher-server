const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const pomos = require("./db/pomos.js");
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.json({
        msg: "Hello both!"	
    });
});

app.get("/pomotimer", (req, res)=>{
    pomos.getAll().then((pomos)=>{
        res.json(pomos);
    });
});


app.post("/pomotimer", (req, res)=>{
    console.log(req.body);
    pomos.insert(req.body).then((pomo)=>{
        res.json(pomo); 
    }).catch((error)=> {
        res.status(500);
        res.json(error);
    });
});

app.delete("/pomotimer", (req, res)=>{
    console.log(req.body);
    pomos.remove(req.body.username)
        .then((result)=> {
            console.log("Deleted a document");
        })
});

const port = process.env.PORT || 9999;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
