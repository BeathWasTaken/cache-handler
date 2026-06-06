const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/cache/*path", (req, res) => {
    const filePath = path.join(
        __dirname,
        "public",
        "cache",
        ...req.params.path
    );

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.download(filePath);
});

app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});