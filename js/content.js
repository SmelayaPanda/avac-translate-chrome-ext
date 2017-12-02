const ENGLISH = "eng";
const RUSSIAN = "rus";
const DEUTSCH = "deu";

let level;
let langFrom;
let langTo;

let dicFrom;
let dicTo;

/* Listen popup.js */
window.onload = function () {
    chrome.storage.sync.get('onLoadCheckBox', function (obj) {
        if (obj.onLoadCheckBox) {
            chrome.storage.sync.get('rangeInput', obj => obj.rangeInput ? level = obj.rangeInput : level = 0);
            chrome.storage.sync.get('langFrom', obj => obj.langFrom ? langFrom = obj.langFrom : 'eng');
            chrome.storage.sync.get('langTo', obj => obj.langTo ? langTo = obj.langTo : 'eng');
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
    if (0 !== document.getElementsByClassName("wordAvac").length) {
        applyLevel(level);
    } else {
        let p = document.getElementsByTagName("p");
        for (let i = 0; i < p.length; i++) {
            p[i].innerHTML = p[i].textContent.replace(/([a-zA-Z'-]+)/gi, `<span class="AVAC">$1</span>`);
        }
        let allWords = document.getElementsByClassName('AVAC');
        let word;
        let rank;
        for (w of allWords) {
            word = w.innerText.trim().toLocaleLowerCase();
            rank = dicFrom.indexOf(word);
            if (-1 !== rank) {
                addSpeakerOnClick(w);
                w.innerHTML += `<span hidden class="wordAvac ___${dicFrom.indexOf(word)}"> [${dicTo[dicFrom.indexOf(word)]}]</span>`;
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

function setDictionary() {
    switch (langFrom) {
        case ENGLISH: {
            dicFrom = eng;
            if (RUSSIAN === langTo) dicTo = rus_from_eng;
            if (DEUTSCH === langTo) dicTo = deu_from_eng;
        }
        case RUSSIAN: {
            dicFrom = rus;
            if (ENGLISH === langTo) dicTo = eng_from_rus;
            if (DEUTSCH === langTo) dicTo = deu_from_rus;
        }
        case DEUTSCH :
            dicFrom = deu;
            if (RUSSIAN === langTo) dicTo = rus_from_deu;
            if (ENGLISH === langTo) dicTo = eng_from_deu;
        default:
            dicFrom = eng;
            dicTo = rus_from_eng;
    }
}


