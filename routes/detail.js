const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/new', function(req, res) {
    const hex = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    models.Color.findOrCreate({
        where: { hex: hex }
    }).spread(function(color, created) {
        res.render('new', {
            title: 'Interview Challenge',
            color: color.get({plain: true})
        });
    });
});

router.get('/:id?', function(req, res) {
    const id = req.params.id;
    models.Color.findAll({
        where: { id: id }
    }).then(function(colors) {
        res.render('detail', {
            title: 'Interview Challenge',
            colors: colors
        });
    });
});



module.exports = router;
