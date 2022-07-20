const router = require('express').Router();
const path = require('path')
const fs = require("fs");
const { uuid } = require('uuidv4');

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, "./../../../db/db.json"), 'utf-8', (err, data) => {
    if (err) {
      return res.status(400).json({ err });
    }
    res.json(JSON.parse(data));
  })
});

router.post('/', (req, res) => {
  const { title, text } = req.body;
  if (text.trim().length > 0) {
    fs.readFile(path.join(__dirname, "./../../../db/db.json" ), 'utf8', (err, data) => {
      if (err) {
        return res.status(400).json({ err });
      }

      const notesInDB = JSON.parse(data);
      const newText = {
        title,
        text,
        id: uuid()
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
});

router.delete('/:title', (req,res) => {
  console.log(req.params.title)
  
  res.json(req.params.title);
  // req.params.title = object with all the parameters
    // slice or array.filter(!title)
})

module.exports = router;