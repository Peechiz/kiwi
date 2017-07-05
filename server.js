const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

let file = 'nzaccredited.json'
// let file = 'test.json'

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json())

app.get('/', (req,res) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.send(err);
    let source = JSON.parse(data);
    source = source.filter(co => !co.visited)

    if (source.length) {
      const index = Math.floor(Math.random() * source.length);

      const kiwi = source[index];
      res.render('index', kiwi)
    } else {
      res.render('index', {title: null})
    }
  })
})

app.post('/applied', (req,res) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.map(job => {
      if (job.title === req.body.title) {
        job.applied = true;
        job.date_applied = new Date().toDateString();
      }
      return job
    })
    let str = JSON.stringify(source, null, 2);
    fs.writeFile(file, str, (err) => {
      if (err) return console.log(err);
      res.sendStatus(200)
    })
  })
})

app.post('/saw', (req,res) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.map(job => {
      if (job.title === req.body.title) {
        job.visited = true;
      }
      return job
    })
    let str = JSON.stringify(source, null, 2);
    fs.writeFile(file, str, (err) => {
      if (err) return console.log(err);
      res.sendStatus(200)
    })
  })
})

app.post('/notes', (req,res) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.map(job => {
      if (job.title === req.body.title) {
        job.notes = req.body.notes;
      }
      return job
    })
    let str = JSON.stringify(source, null, 2);
    fs.writeFile(file, str, (err) => {
      if (err) return console.log(err);
      res.sendStatus(200)
    })
  })
})

app.get('/applied', (req,res) => {
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.filter(co => co.applied);

    res.render('applied', { applied: source })
  })
})

app.get('/visited', (req,res) => {
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    let total = source.length;
    source = source.filter(co => co.visited);
    let viewed = source.length;

    res.render('visited', { visited: source, viewed, total })
  })
})

app.post('/unvisit', (req,res) => {
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.map(job => {
      if (job.title === req.body.title) {
        job.visited = false;
      }
      return job
    })
    let str = JSON.stringify(source, null, 2);
    fs.writeFile(file, str, (err) => {
      if (err) return console.log(err);
      res.sendStatus(200)
    })
  })
})

app.post('/star', (req,res) => {
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.map(job => {
      if (job.title === req.body.title) {
        job.starred = true;
      }
      return job
    })
    let str = JSON.stringify(source, null, 2);
    fs.writeFile(file, str, (err) => {
      if (err) return console.log(err);
      res.sendStatus(200)
    })
  })
})

app.get('/starred', (req,res)=>{
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.filter(job => job.starred);
    res.render('starred', { starred: source })
  })
})

app.post('/unstar', (req,res) => {
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);

    let source = JSON.parse(data);
    source = source.map(job => {
      if (job.title === req.body.title) {
        job.starred = false;
      }
      return job
    })
    let str = JSON.stringify(source, null, 2);
    fs.writeFile(file, str, (err) => {
      if (err) return console.log(err);
      res.sendStatus(200)
    })
  })
})

app.get('/edit/:title', (req,res) => {
  // console.log(req.params.title);
  fs.readFile(file, (err,data) => {
    if (err) return res.send(err);


    let source = JSON.parse(data);
    let company = source.reduce((co, obj)=>{
      if (co.title === req.params.title) {
        obj = co
      }
      return obj
    },{})

    res.render('edit', company)
  })
})

app.use(express.static('public'));

const port = process.env.PORT || 9001
app.listen(port, ()=>{
  console.log(`listening on ${port}`);
})
