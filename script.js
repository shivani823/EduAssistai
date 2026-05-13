let selectedLanguage = "english";
let selectedMode = "general";

// 🌐 Language selector
function setLanguage(lang) {
    selectedLanguage = lang;
    updateActiveButtons();
}

// 📚 Mode selector
function setMode(mode) {
    selectedMode = mode;
    updateActiveButtons();
}

// ✨ Fix active button highlighting
function updateActiveButtons() {
    document.querySelectorAll(".pill").forEach(btn => {
        btn.classList.remove("active");
    });

    // Re-add active class correctly
    event.target.classList.add("active");
}

// 🤖 Ask AI function
async function askAI() {

    const question = document.getElementById("question").value;
    const responseDiv = document.getElementById("response");

    if (question.trim() === "") {
        responseDiv.innerHTML = "Please enter a question.";
        return;
    }

    responseDiv.innerHTML = "Thinking... 🤔";

    try {
        const response = await fetch("http://127.0.0.1:5000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question,
                language: selectedLanguage,
                mode: selectedMode
            })
        });

        const data = await response.json();

        responseDiv.innerHTML = data.answer;

    } catch (error) {
        responseDiv.innerHTML = "Error connecting to backend.";
        console.log(error);
    }
