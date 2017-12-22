

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

function removeElementsByClass( className )
{
    let elements = document.getElementsByClassName( className );
    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}