const Sequelize = require("sequelize");

const db = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:"
});

const Color = db.define("color", {
    hex: { type: Sequelize.STRING },
    match: { type: Sequelize.STRING }
});

db.sync();

// define available colors
let colors = {
    '6600ff': 'purple',
    '808080': 'gray',
    '0000ff': 'blue',
    '663300': 'brown',
    '00ff00': 'green',
    'ff8000': 'orange',
    'ff0000': 'red',
    'ffff00': 'yellow',
};

// convert the `colors`-object to an array
let colorsArr = [];
for(let key in colors) {
    colorsArr.push(key);
}

// Function used to find the closest color
Array.closest = (function () {
    function dist(s, t) {
        if (!s.length || !t.length) return 0;
        return dist(s.slice(2), t.slice(2)) +
            Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16));
    }

    return function (arr, str) {
        var min = 0xffffff;
        var best, current, i;
        for (i = 0; i < arr.length; i++) {
            current = dist(arr[i], str)
            if (current < min) {
                min = current
                best = arr[i];
            }
        }
        return best;
    };
}());

for (let i = 0; i < 100; i++) {
    let hex = (Math.random()*0xFFFFFF<<0).toString(16);
    while (hex.length < 6){
        hex = "0"+hex
    }
    let match = Array.closest(colorsArr, hex);
    //console.log(hex + ' matches to ' + colors[match])

    Color.create({ hex: '#'+hex, match: colors[match] })
}

db.sync();

module.exports = { Color };