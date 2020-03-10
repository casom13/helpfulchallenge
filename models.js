const Sequelize = require("sequelize");

const db = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:"
});

const Color = db.define("color", {
    hex: { type: Sequelize.STRING }
});

db.sync();

for (let i = 0; i < 100; i++) {
    Color.create({ hex: '#'+(Math.random()*0xFFFFFF<<0).toString(16) })
}

db.sync();

module.exports = { Color };