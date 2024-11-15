const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const marked = require("marked");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const filePath = path.join(__dirname, "../../../../READ_ME.md");
		const markdownContent = await fs.readFile(filePath, "utf-8");
		const htmlContent = marked.parse(markdownContent);

		res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Documentation</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
                pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
                code { font-family: Consolas, Monaco, 'Andale Mono', monospace; }
            </style>
        </head>
        <body>
             ${htmlContent}
        </body>
        </html>
        `);
	} catch (error) {
        console.log(error);
		res.status(500).send("Error loading documentation");
	}
});

module.exports = router;
