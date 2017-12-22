let storage = chrome.storage.sync;
// Stages
const L1 = "Beginner";
const L2 = "Pre intermediate";
const L3 = "Intermediate";
const L5 = "Advanced";
const L4 = "Upper intermediate";
// Available languages
const ENGLISH = "eng";
const RUSSIAN = "rus";
const DEUTSCH = "deu";
const SPANISH = "spa";

const languages = {
    eng: 'English',
    rus: 'Russian',
    deu: 'Deutsch',
    spa: 'Spanish'
};

let lf;
let lt;
let range;
let stage;
let power;
let settings;


window.onload = function () {
    /* assign HTML elements */
    lf = document.getElementById('langFrom');
    lt = document.getElementById('langTo');

    generateLangFromOption(lf, languages);
    generateLangToOption(lf, lt, languages);

    settings = document.getElementById('settings');
    range = document.getElementById('level');
    stage = document.getElementById("stage");
    power = document.getElementById("power");

    /* Getting Chrome storage value */
    storage.get('langFrom', obj => lf.value = obj.langFrom);
    storage.get('langTo', obj => lt.value = obj.langTo);
    storage.get('level', obj => {
        range.value = obj.level;
        setStageMessage(range, stage);
    });

    storage.get('power', obj => {
        power.checked = obj.power;
        settings.style.display = power.checked ? settings.style.display = 'block' : settings.style.display = 'none';
    });


    /* Setting Chrome storage value */
    lf.oninput = () => {
        storage.set({'langFrom': lf.value});
        generateLangToOption(lf, lt, languages);
        sendMsg();
    };
    lt.onchange = () => {
        storage.set({'langTo': lt.value});
        sendMsg();
    };
    power.onchange = () => {
        storage.set({'power': power.checked});
        settings.style.display = power.checked ? settings.style.display = 'block' : settings.style.display = 'none';
        sendMsg();
    };
    range.oninput = () => {
        storage.set({'level': range.value});
        setStageMessage(range, stage);
        sendMsg();
    };
};

function sendMsg() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        // and use that tab to fill in out title and url
        let obj = {};
        obj.power = power.checked;
        obj.level = range.value;
        obj.langFrom = lf.value;
        obj.langTo = lt.value;
        chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(obj));
    });
}


function generateLangFromOption(lf, languages) {
    for (let lang in languages) {
        let op = document.createElement('option');
        op.setAttribute('value', lang);
        op.innerHTML = languages[lang];
        lf.appendChild(op);
    }
}


function generateLangToOption(lf, lt, languages) {
    let lCopy = Object.assign({}, languages); // deep copy
    lt.innerHTML = '';
    delete lCopy[lf.options[lf.selectedIndex].value];
    for (let lang in lCopy) {
        let op = document.createElement('option');
        op.setAttribute('value', lang);
        op.innerHTML = lCopy[lang];
        lt.appendChild(op);
    }
}

function setStageMessage(range, stage) {
    if (range.value < 20 && stage.innerText !== L1) fadeTextReplace(stage, L1);
    else if (range.value >= 20 && range.value < 40 && stage.innerText !== L2) fadeTextReplace(stage, L2);
    else if (range.value >= 40 && range.value < 60 && stage.innerText !== L3) fadeTextReplace(stage, L3);
    else if (range.value >= 60 && range.value < 80 && stage.innerText !== L4) fadeTextReplace(stage, L4);
    else if (range.value >= 80 && stage.innerText !== L5) fadeTextReplace(stage, L5);
}