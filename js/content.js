// Available languages
const ENGLISH = "eng";
const RUSSIAN = "rus";
const DEUTSCH = "deu";
const SPANISH = "spa";
// Avac parameters
let level;
let langFrom;
let langTo;
// Process variables
let regExp;
let dicFrom;
let dicTo;
let fromSpeak;
let toSpeak;

/* Listen popup.js */
window.onload = function () {
    // don't assign a variable because script running faster than storage works.
    storage.get('power', obj => {
        if (obj.power) {
            storage.get('level', obj => {
                obj.level ? level = obj.level : level = 0;
                storage.get('langFrom', obj => {
                    obj.langFrom ? langFrom = obj.langFrom : 'eng';
                    storage.get('langTo', obj => {
                        obj.langTo ? langTo = obj.langTo : 'eng';
                        translateThis();
                    });
                });
            });
        }
    });

    chrome.runtime.onMessage.addListener(
        msgObj => {
            storage.get('power', obj => {
                if (obj.power) {
                    let params = JSON.parse(msgObj);
                    level = params.level;
                    langTo = params.langTo;
                    langFrom = params.langFrom;
                    translateThis();
                } else {
                    document.location.reload(true);
                }
            })
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
    let maxRank = level ** Math.exp(1); // max = 64^exp = 81228
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
            regExp = new RegExp(/([a-zA-ZäöüÄÖÜß']+)/gi);
            break;
        case RUSSIAN:
            regExp = new RegExp(/([а-яА-ЯЁё-]+)/gi);
            break;
        case SPANISH:
            regExp = new RegExp(/([a-zA-ZáéíñóúüÁÉÍÑÓÚÜ¿]+)/gi);
            break;
    }
}

function setDictionary() {
    switch (langFrom) {
        case ENGLISH: {
            dicFrom = eng;
            if (langTo === RUSSIAN) dicTo = eng_rus;
            if (langTo === DEUTSCH) dicTo = eng_deu;
            if (langTo === SPANISH) dicTo = eng_spa;
        }
            break;
        case RUSSIAN: {
            dicFrom = rus;
            if (langTo === ENGLISH) dicTo = rus_eng;
            if (langTo === DEUTSCH) dicTo = rus_deu;
            if (langTo === SPANISH) dicTo = rus_spa;
        }
            break;
        case DEUTSCH: {
            dicFrom = deu;
            if (langTo === ENGLISH) dicTo = deu_eng;
            if (langTo === RUSSIAN) dicTo = deu_rus;
            if (langTo === SPANISH) dicTo = deu_spa;
        }
            break;
        case SPANISH: {
            dicFrom = spa;
            if (langTo === ENGLISH) dicTo = spa_eng;
            if (langTo === RUSSIAN) dicTo = spa_rus;
            if (langTo === DEUTSCH) dicTo = spa_deu;
        }
            break;
    }
}

function addSpeakerOnClick(elem) {
    if (langFrom === ENGLISH) fromSpeak = 'en-GB';
    else if (langFrom === RUSSIAN) fromSpeak = 'ru-RU';
    else if (langFrom === DEUTSCH) fromSpeak = 'de-DE';
    else if (langFrom === SPANISH) fromSpeak = 'es-ES';

    if (langTo === ENGLISH) toSpeak = 'en-GB';
    else if (langTo === RUSSIAN) toSpeak = 'ru-RU';
    else if (langTo === DEUTSCH) toSpeak = 'de-DE';
    else if (langTo === SPANISH) toSpeak = 'es-ES';

    elem.onclick = function () {
        let str = elem.innerText.split('[');
        speakWord(str[0], fromSpeak, 0.9, 0.9, 1, 'native');
        speakWord(str[1], toSpeak, 0.9, 0.9, 1, 'native');
    };
}


