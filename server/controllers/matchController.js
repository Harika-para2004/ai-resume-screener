const fs = require("fs");
const pdfParse = require("pdf-parse");
const path = require("path");
const { rankResumes } = require("../utils/tfidfMatcher");

exports.handleMatch = async (req, res) => {
  try {
    const { jd } = req.body;
    const files = req.files;

    const resumeData = [];

    for (const file of files) {
      const pdfBuffer = fs.readFileSync(file.path);
      const text = (await pdfParse(pdfBuffer)).text;
      resumeData.push({ name: file.originalname, content: text });
      fs.unlinkSync(file.path); // delete after reading
    }

    const ranked = rankResumes(jd, resumeData);

    res.json({ matches: ranked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
