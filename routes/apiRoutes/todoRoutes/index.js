const router = require('express').Router();
const connection = require("./../../../db/db.json");
const path = require('path')
const fs = require("fs");

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname,"./../../../db/db.json"), 'utf-8', (err,data) => {
        if (err) {
            return res.status(400).json({ err });
          }
          res.json(JSON.parse(data));
     
    })
  });

  router.post('/', (req, res) => {
    res.json('POST request')
  })




module.exports = router;