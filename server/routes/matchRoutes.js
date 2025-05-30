const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleMatch } = require("../controllers/matchController");

const upload = multer({ dest: "uploads/" });

router.post("/match", upload.array("resumes"), handleMatch);

module.exports = router;
