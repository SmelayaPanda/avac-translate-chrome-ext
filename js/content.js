// Avac parameters
let level;
let langFrom;
let langTo;
let rainbow;
// Process variables
let isNewLang = false;
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
                        storage.get('color', obj => {
                            obj.color ? rainbow = obj.color : 'green';
                            invoke();
                        });
                    });
                });
            });
        }
    });

    chrome.runtime.onMessage.addListener(
        msgObj => {
            let params = JSON.parse(msgObj);
            if (params.power) {
                isNewLang = (langFrom !== params.langFrom || langTo !== params.langTo);
                level = params.level;
                langTo = params.langTo;
                langFrom = params.langFrom;
                rainbow = params.color;
                invoke();
            } else {
                document.location.reload(true);
            }
        });
};


function invoke() {
    setDictionary();
    setWordStyle();
    setRegExp();
    if (isNewLang) {
        if (0 !== document.getElementsByClassName("wordAvac").length) {
            removeElementsByClass('wordAvac');
        }
        translateText();
    } else if (0 !== document.getElementsByClassName("wordAvac").length) {
        applyLevel(level);
    } else {
        translateText();
    }
}

function translateText() {
    ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'div', 'li', 'font', 'td', 'dd', 'font'
    ].forEach(arg => wrapElementWordsIntoSpan(arg));

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

function wrapElementWordsIntoSpan(tag) {
    for (el of document.getElementsByTagName(tag)) {
        let ap = '';
        for (let ch = el.firstChild; ch !== null; ch = ch.nextSibling) {
            if (ch.nodeType === Node.TEXT_NODE) {
                ap += ch.textContent.replace(regExp, `<span class="AVAC">$1</span>`);
            } else if (ch.outerHTML !== undefined) {
                ap += ch.outerHTML;
            }
        }
        el.innerHTML = ap;
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

function setWordStyle() {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.wordAvac { color: ${rainbow} }`;
    document.getElementsByTagName('head')[0].appendChild(style);
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
            else if (langTo === DEUTSCH) dicTo = eng_deu;
            else if (langTo === SPANISH) dicTo = eng_spa;
        }
            break;
        case RUSSIAN: {
            dicFrom = rus;
            if (langTo === ENGLISH) dicTo = rus_eng;
            else if (langTo === DEUTSCH) dicTo = rus_deu;
            else if (langTo === SPANISH) dicTo = rus_spa;
        }
            break;
        case DEUTSCH: {
            dicFrom = deu;
            if (langTo === ENGLISH) dicTo = deu_eng;
            else if (langTo === RUSSIAN) dicTo = deu_rus;
            else if (langTo === SPANISH) dicTo = deu_spa;
        }
            break;
        case SPANISH: {
            dicFrom = spa;
            if (langTo === ENGLISH) dicTo = spa_eng;
            else if (langTo === RUSSIAN) dicTo = spa_rus;
            else if (langTo === DEUTSCH) dicTo = spa_deu;
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


