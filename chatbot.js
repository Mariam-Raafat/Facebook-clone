const chatContainer = document.querySelector(".chat-wrapper");
const chatCard = document.querySelector(".card-body");
chatContainer.style.display = "none";
const chatInput = document.querySelector(".chat-input");
const chatForm = document.querySelector(".chat-form");
const geminiResponse = document.querySelector(".gemini-response");
const apiKey = "AIzaSyAJJAFDhlCbOMd6fHoQd0Vxd8Fj_cbMnZE";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const apiResponse = async (geminiResponse, userMessage) => {
  const responseText = geminiResponse.querySelector(".response-text");
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });
    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    responseText.innerText = aiResponse;
  } catch (error) {
    console.error(error);
  }
};

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = chatInput.value;
  if (userMessage === "") return;
  console.log(userMessage);

  const chatContent = document.createElement("p");
  chatContent.classList.add("user-message");
  chatContent.innerText = userMessage;
  chatCard.appendChild(chatContent);
  chatContainer.style.display = "block";

  const responseMsg = document.createElement("p");
  responseMsg.classList.add("response-text");
  geminiResponse.appendChild(responseMsg);
  apiResponse(geminiResponse, userMessage);

  chatForm.reset();
});
