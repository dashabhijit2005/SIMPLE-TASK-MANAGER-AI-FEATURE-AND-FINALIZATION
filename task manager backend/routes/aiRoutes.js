const express = require("express");
const router = express.Router();

const { aiSuggestion } = require("../controllers/aiController");

router.post("/suggest", aiSuggestion);

module.exports = router;