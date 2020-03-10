const express = require('express');
const router = express.Router();
const models = require("../models");

router.get('/', function(req, res) {
  const offset = 0;
  models.Color.count({}).then(c => {
    const count = (c / 12) + 1;
    models.Color.findAll({
      limit: 12,
      offset: offset
    }).then(function (colors) {
      res.render('index', {
        title: 'Interview Challenge',
        colors: colors,
        count: count,
        page: 1
      });
    });
  });
});

router.get('/page/:page?', function(req, res) {
  let page = req.params.page;
  let offset = 0;
  if (!page){
    page = 1;
  } else{
    offset = (req.params.page - 1) * 12;
  }
  models.Color.count({}).then(c => {
    const count = (c / 12) + 1;
    models.Color.findAll({
      limit: 12,
      offset: offset
    }).then(function(colors) {
      res.render('index', {
        title: 'Interview Challenge',
        colors: colors,
        count: count,
        page: page
      });
      console.log(colors.length);
    });
  });
});


module.exports = router;
