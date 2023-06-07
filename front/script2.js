// Get the necessary elements from the HTML
const textarea = document.getElementById('myTask');
const speakBtn = document.getElementById('speakBtn');
const answerBtn = document.getElementById('answerBtn');
const answerBox = document.getElementById('answerBox');



// Create a new SpeechRecognition object
const recognition = new webkitSpeechRecognition();
console.log(recognition)

// Set properties for the SpeechRecognition object
recognition.continuous = true;
recognition.lang = 'en-US';

function loadingText(){
  let dots= answerBox.placeholder;
  dots= dots.length<3 ? dots+"." :'';
  answerBox.placeholder=dots;
}

// When the button is clicked, start speech recognition
speakBtn.addEventListener('click', () => {
  recognition.start();
  speakBtn.disabled = true;
  speakBtn.textContent = 'Listening...';
});


// When speech is recognized, add it to the text area
recognition.onresult = (event) => {
  console.log(event)
  const result = event.results[event.results.length - 1];
  const transcript = result[0].transcript;
  console.log(String(transcript)==='Stop.');
  if(transcript.includes('Stop')|| transcript.includes('stop') ) {
    recognition.stop();
    speakBtn.disabled = false;
    speakBtn.textContent= 'Start Speaking';
  }
  else if(transcript=='Clear') {
    textarea.value = ""}
  else if (transcript=='Answer.') {
      recognition.stop();
      speakBtn.textContent= 'Start Speaking';
      sendAPIRequest();

  }
  else{
    console.log(transcript);
    textarea.value += transcript + ' ';
  }
};


// When speech recognition ends, re-enable the button
recognition.onend = () => {
    speakBtn.disabled = false;
    speakBtn.textContent = 'Start Speaking';
};

//////////////////////////////////////////////////////////////////////////////

// Create a new SpeechSynthesisUtterance instance
const gptAnswer = new SpeechSynthesisUtterance();

// Set the desired language
gptAnswer.lang = "en-US";


// Function to initiate text-to-speech conversion
// function speakText() {
// Call the SpeechSynthesis API to convert text to speech
// response from chatGPT:
    async function sendAPIRequest() {
      try{
        const loadingInterval = setInterval(loadingText, 500);
        console.log(textarea.value)
        const response= await axios.post('http://localhost:4000/api/gpt', {prompt: textarea.value} )
        console.log(response);
        gptAnswer.text= response.data.answer;
        setTimeout(() => {
          clearInterval(loadingInterval);
        }, 3000);
        answerBox.textContent= response.data.answer;
        speechSynthesis.speak(gptAnswer)
      }
      catch(err){
        console.log(err)

      }
    }





