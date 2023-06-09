const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

// configure OpenAI library using api key from environment variable 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/openai_demo', isLoggedIn, async (req, res, next) => {
  res.render('chatGPT');
});

router.post('/gpt', isLoggedIn, async (req, res, next) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: req.body.prompt,
  // });
  // console.log(completion);
  //const answer = completion.data.choices[0].text;
  //res.render('gptAnswer', { answer });
});


router.post('/openai_demo', isLoggedIn, async (req, res, next) => {
  const response = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai',
    { prompt: req.body.prompt });
  res.send(response.data);
  // const answer = response.data.choices[0].message.content;
  // res.render('gptAnswer', { answer });
});

module.exports = router;