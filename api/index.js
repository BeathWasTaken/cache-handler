const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
    const url = req.url.split("?")[0];

    if (url.startsWith("/cache/")) {
        const fileName = url.replace("/cache/", "");

        const filePath = path.join(
            process.cwd(),
            "public",
            "cache",
            fileName
        );

        if (!fs.existsSync(filePath)) {
            return res.status(404).send(`File not found: ${filePath}`);
        }

        const buffer = fs.readFileSync(filePath);

        res.setHeader("Content-Type", "application/octet-stream");
        return res.status(200).send(buffer);
    }

    return res.status(404).send("Not found");
};