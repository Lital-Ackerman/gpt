const express = require('express');
const bodyParser = require('body-parser');
// const OpenAI = require('openai');
const cors= require("cors");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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'
});
const openai= new OpenAIApi(configuration);
// const openai= new OpenAI({
//   apiKey: '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'
// })
// Initialize Express.js
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Create an instance of the OpenAI API client
// const openai = new OpenAI('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');

// Define the API endpoint for GPT interaction
// app.post('/api/gpt', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;

//     // Make a request to GPT
//     const gptResponse = await openai.complete({
//       engine: 'davinci-codex',
//       prompt: prompt,
//       maxTokens: 10
//     });

//     // Extract the generated text from the GPT response
//     const generatedText = gptResponse.data.choices[0].text;

//     // Return the generated text as the API response
//     res.json({ generatedText });
//   } catch (error) {
//     console.log('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

app.post("/api/whisper", async(req, res)=>{
  const audio= req.body;
  console.log(audio);
  // const response= await https://api.openai.com/v1/whisper/transcriptions
})
app.post("/api/gpt", async(req, res)=>{
  try{
    const prompt= req.body.prompt;
    console.log(req.body)
    const response= await openai.createChatCompletion({
      model: "gpt-4",
      messages:[
        { role: "user", content: prompt }
      ],
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 1,
    });
  console.log(response);
    res.status(200).json({ answer: response.data.choices[0].message.content });
  }

  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
} )

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

