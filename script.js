addEventListener("DOMContentLoaded", () => {
    var translateButton = document.getElementById("btn");

    translateButton.addEventListener("click", async () => {
        const inputText = document.getElementById("textToTranslate").value;
        var selectedLanguage = document.querySelector('input[name="lang"]:checked')?.value;
        if (!inputText) {
            alert("Please enter a text.");
            return;
        }
        if (!selectedLanguage) {
            alert("Please select a language.");
            return;
        }
        console.log(`Selected language: ${selectedLanguage}`);


        const payload = {
            contents: [
                {
                    parts: [
                        { text: `Translate the following text: ${inputText}.  / to this language ${selectedLanguage} , only give the translation, do not include any other text.` },
                    ],
                },
            ],
        };

        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';


        document.getElementById("translatedText").value = "Translating...";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY,
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        const content = data['candidates'][0]['content']['parts'][0]['text'];
        console.log(content);

        document.getElementById("translatedText").value = content;
    }, false);
});


