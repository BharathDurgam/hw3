function fetchMeaning() {
    const word = document.getElementById('wordInput').value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<h2>Meanings:</h2>';

            if (data && data.length > 0) {
                data.forEach(entry => {
                    const partOfSpeech = entry.meanings[0].partOfSpeech; // Assuming the first meaning's part of speech
                    const definition = entry.meanings[0].definitions[0].definition; // Assuming the first definition
                    resultDiv.innerHTML += `<p><strong>${partOfSpeech}:</strong> ${definition}</p>`;
                });
            } else {
                resultDiv.innerHTML = '<p>No meanings found for the word.</p>';
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const word = document.getElementById('wordInput').value;
        fetchMeaning(word);
    }
}