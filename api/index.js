const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
    if (req.url === "/") {
        return res.sendFile(path.join(process.cwd(), "index.html"));
    }

    if (req.url.startsWith("/cache/")) {
        const fileName = req.url.replace("/cache/", "");

        const filePath = path.join(
            process.cwd(),
            "public",
            "cache",
            fileName
        );

        if (!fs.existsSync(filePath)) {
            return res.status(404).send("File not found");
        }

        return res.download(filePath);
    }

    return res.status(404).send("Not found");
};