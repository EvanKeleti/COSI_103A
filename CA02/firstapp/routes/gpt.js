const express = require('express');
const router = express.Router();
const axios = require('axios');

/* 
My openai api key expired, so I commented out the code using the openai package.
*/

// const { Configuration, OpenAIApi } = require("openai");

// // configure OpenAI library using api key from environment variable 
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);



// router.post('/gpt', isLoggedIn, async (req, res, next) => {
//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: req.body.prompt,
//     });
//     console.log(completion.data.choices[0].text);
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.status);
//       console.log(error.response.data);
//     } else {
//       console.log(error.message);
//     }
//   }
// });

router.get('/openai-demo', isLoggedIn, async (req, res, next) => {
  const header = "Get a Response from OpenAI";
  const promptStart = "";
  res.render('openai', { header, promptStart });
});

router.post('/openai-demo', isLoggedIn, async (req, res, next) => {
  console.log(req.body.promptStart);
  const response = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai',
    { prompt: req.body.promptStart + req.body.prompt });
  res.send(response.data);
});

router.get('/openai-poem', isLoggedIn, async (req, res, next) => {
  const header = "Give OpenAI a Topic to Write a Poem About!"
  const promptStart = "Write a poem about ";
  res.render('openai', { header, promptStart })
});

router.get('/openai-index', isLoggedIn, async (req, res, next) => {
  res.render('openaiIndex');
});

module.exports = router;