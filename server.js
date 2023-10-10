const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.render('index');
})

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width:1280,
    height:720,
  });
  await page.goto(url);
  const buffer = await page.screenshot();
  res.header('Content-Type', 'image/png');
  res.header('Content-Disposition', 'inline; filename=screenshot.png')
  return res.send(buffer);
})
app.listen(4000);