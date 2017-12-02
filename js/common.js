/* Fade-replace for text */
function fadeTextReplace(element, newValue) {
    element.classList.add('hide');
    setTimeout(function () {
        element.innerHTML = newValue;
    }, 200);
    setTimeout(function () {
        element.classList.remove('hide');
    }, 500);
}

/* Speak word use SpeechSynthesisUtterance */
function speakWord(word, lang, volume, rate, pitch, voiceURI) {
    let msg = new SpeechSynthesisUtterance();
    msg.voiceURI = voiceURI;
    msg.pitch = pitch;      // 0 to 2
    msg.volume = volume;    // volume, from 0 to 1, default is 1
    msg.rate = rate;        // speaking rate, default is 1 (0.1 to 10)
    msg.lang = lang;        // language, default is 'en-US'
    msg.text = word;
    window.speechSynthesis.speak(msg);
}

/* Custom speaker for clicked element */
function addSpeakerOnClick(elem) {
    elem.onclick = function () {
        let str = elem.innerText.split('[');
        speakWord(str[0], 'en-GB', 0.8, 0.8, 1, 'native');
        speakWord(str[1], 'ru', 0.8, 0.8, 1, 'native');
    };
}