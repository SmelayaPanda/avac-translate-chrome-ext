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
    chrome.storage.sync.get('onLoadCheckBox', function (obj) {
        if (obj.onLoadCheckBox) {
            chrome.storage.sync.get('rangeInput', obj => level = obj.rangeInput);
            chrome.storage.sync.get('langFrom', obj => langFrom = obj.langFrom);
            chrome.storage.sync.get('langTo', obj => langTo = obj.langTo);
            translateThis();
        }
    });

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
    let maxRank = level ** 2.3;
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
            regExp = new RegExp(/([a-zA-ZäöüÄÖÜß'-]+)/gi);
            break;
        case RUSSIAN:
            regExp = new RegExp(/([а-яА-ЯЁё'-]+)/gi);
            break;
    }
}

function setDictionary() {
    if (ENGLISH === langFrom && RUSSIAN === langTo) {
        dicFrom = eng_rus_From;
        dicTo = eng_rus_To;
    }
}


