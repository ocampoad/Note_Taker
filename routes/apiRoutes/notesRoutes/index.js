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

router.post('/', (req, res) => {67
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

router.delete('/:id', (req, res) => {67
  const { id } = req.params;

  if (id.trim().length > 0) {
    fs.readFile(path.join(__dirname, "./../../../db/db.json" ), 'utf8', (err, data) => {
      if (err) {
        return res.status(400).json({ err });
      }

      const filteredNotes = JSON.parse(data).filter(note => note.id !== id);
      
      fs.writeFile(path.join(__dirname, "./../../../db/db.json"), JSON.stringify(filteredNotes), err => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.json(filteredNotes);
      })
    });


  } else {
    res.status(400).json({ error: 'Todo must be provided' });
  }
});

module.exports = router;