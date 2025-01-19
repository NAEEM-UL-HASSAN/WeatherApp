const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const staticPath = path.join(__dirname, './public');
const viewspath = path.join(__dirname, './templates/views');
const partials = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewspath);
app.use(express.static(staticPath));
hbs.registerPartials(partials);

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/weather', (req, res) => {
    res.render('weather');
});
app.get('*', (req, res) => {
    res.render('404error', {
        errorMsg: 'Oops! Page Not Found'
    });
});

module.exports = app;