const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const inputWord = document.getElementById("inp-word");

btn.addEventListener("click", () => {
    let inpWord = inputWord.value;
    
    // Fetch solicita datos a la API
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Para ver los datos en consola si lo necesitas

            // Inyectamos el HTML con los datos recibidos
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                </div>
                <div class="word-details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ""}/</p>
                </div>
                <p class="definition">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>
            `;
        })
        .catch(() => {
            // Si la palabra no existe o hay error
            result.innerHTML = `<h3 class="error">No pudimos encontrar esa palabra. 😕</h3>`;
        });
});

// Permitir buscar presionando "Enter"
inputWord.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        btn.click();
    }
});