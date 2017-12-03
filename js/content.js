// Available languages
const ENGLISH = "eng";
const RUSSIAN = "rus";
const DEUTSCH = "deu";
// Avac parameters
let level;
let langFrom;
let langTo;
// Process variables
let regExp;
let dicFrom;
let dicTo;

/* Listen popup.js */
window.onload = function () {
    chrome.runtime.onMessage.addListener(
        msgObj => {
            let params = JSON.parse(msgObj);
            level = params.level;
            langTo = params.langTo;
            langFrom = params.langFrom;
            translateThis();
        });
};

function translateThis() {
    setDictionary();
    setRegExp();
    if (0 !== document.getElementsByClassName("wordAvac").length) {
        applyLevel(level);
    } else {
        for (p of document.getElementsByTagName("p")) {
            p.innerHTML = p.textContent.replace(regExp, `<span class="AVAC">$1</span>`);
        }
        let word;
        let rank;
        for (w of document.getElementsByClassName('AVAC')) {
            word = w.innerText.trim().toLocaleLowerCase();
            rank = dicFrom.indexOf(word);
            if (-1 !== rank) {
                addSpeakerOnClick(w);
                w.innerHTML += `<span hidden class="wordAvac ___${rank}"> [${dicTo[rank]}]</span>`;
            }
        }
        applyLevel(level);
    }
}

function applyLevel(level) {
    for (let w of document.querySelectorAll('[class*=___]')) {
        w.style.display = 'inline';
    }
    let maxRank = level ** 2.5;
    for (let i = 0; i < maxRank; i++) {
        for (w of document.getElementsByClassName('___' + i)) {
            w.style.display = 'none';
        }
    }
}

function setRegExp() {
    switch (langFrom) {
        case ENGLISH:
            regExp = new RegExp(/([a-zA-Z'-]+)/gi);
            break;
        case DEUTSCH:
            regExp = new RegExp(/([a-zA-ZäöüÄÖÜß-]+)/gi);
            break;
        case RUSSIAN:
            regExp = new RegExp(/([а-яА-ЯЁё-]+)/gi);
            break;
    }
}

function setDictionary() {
    switch (langFrom) {
        case ENGLISH: {
            dicFrom = eng;
            if (langTo === RUSSIAN) dicTo = eng_rus;
            if (langTo === DEUTSCH) dicTo = eng_deu;
        }
            break;
        case RUSSIAN: {
            dicFrom = rus;
            if (langTo === ENGLISH) dicTo = rus_eng;
            if (langTo === DEUTSCH) dicTo = rus_deu;
        }
            break;
        case DEUTSCH: {
            dicFrom = deu;
            if (langTo === ENGLISH) dicTo = deu_eng;
            if (langTo === RUSSIAN) dicTo = deu_rus;
        }
            break;
    }
}

function addSpeakerOnClick(elem) {
    let fromSpeak;
    let toSpeak;

    switch (langFrom) {
        case ENGLISH:
            fromSpeak = 'en-GB';
            break;
        case RUSSIAN :
            fromSpeak = 'ru';
    }
    switch (langTo) {
        case ENGLISH:
            toSpeak = 'en-GB';
            break;
        case RUSSIAN :
            toSpeak = 'ru';
    }
    elem.onclick = function () {
        let str = elem.innerText.split('[');
        speakWord(str[0], fromSpeak, 0.8, 0.8, 1, 'native');
        speakWord(str[1], toSpeak, 0.8, 0.8, 1, 'native');
    };
}


