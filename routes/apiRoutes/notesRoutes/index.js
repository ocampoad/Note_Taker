const router = require('express').Router();
const path = require('path')
const fs = require("fs");

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, "./../../../db/db.json"), 'utf-8', (err, data) => {
    if (err) {
      return res.status(400).json({ err });
    }
    console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  })
});

router.post('/', (req, res) => {
  const { text } = req.body;
  console.log(req.body)
  console.log(text)
  if (text.trim().length > 0) {
    fs.readFile(path.join(__dirname, "./../../../db/db.json" ), 'utf8', (err, data) => {
      if (err) {
        return res.status(400).json({ err });
      }

      const notesInDB = JSON.parse(data);
      const newText = {
        text,
        id: notesInDB.length + 1,
      };
      notesInDB.push(newText);
      fs.writeFile(path.join(__dirname, "./../../../db/db.json"), JSON.stringify(notesInDB), err => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.json(notesInDB);
      })
    });


  } else {
    res.status(400).json({ error: 'Todo must be provided' });
  }
})

module.exports = router;