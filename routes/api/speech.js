const express = require("express");
const { check, validationResult } = require("express-validator");
const Speech = require("../../model/speech");
const router = express.Router();

//@route: /api/add-speech
//@desc route for adding speech
//@access Public

router.post(
  "/add-speech",
  [
    check("title", "Speech Title is required")
      .not()
      .isEmpty(),
    check("text", "Speech Text is required")
      .not()
      .isEmpty(),
    check("author", "Speech Author is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { title, text, author } = req.body;
      const newSpeech = new Speech({
        speechTitle: title,
        speechText: text,
        speechAuthor: author,
        speechDate: Date.now()
      });

      const speech = await newSpeech.save();
      res.status(200).json(speech);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@route: /api/fetch-speech
//@desc route for fetching speeches
//@access Public

router.get("/fetch-speech", async (req, res) => {
  try {
    const speeches = await Speech.find({ speechDate: -1 });
    return res.send(speeches);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
