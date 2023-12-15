const express = require("express");
const db = require("./src/lib/db");
const app = require("./app");

app.listen(5000, async () => {
    try {
        await db.sequelize.sync({ force: true });
        console.log("Backend Start");
    } catch (error) {
        console.error("Backend Error", error);
    }
});
