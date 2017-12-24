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
let color = 'green';
let colors;
let settings;

window.onload = function () {
    lf = document.getElementById('langFrom');
    lt = document.getElementById('langTo');
    settings = document.getElementById('settings');
    range = document.getElementById('level');
    stage = document.getElementById("stage");
    power = document.getElementById("power");
    colors = document.getElementsByName('hat-color');

    updateColorScheme();
    updatePowerOption();
    updateSelectedLanguages();
    updateLevel();
};

function sendMsg() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        let obj = {};
        obj.power = power.checked;
        obj.level = range.value;
        obj.langFrom = lf.value;
        obj.langTo = lt.value;
        obj.color = color;
        chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(obj));
    });
}

function updatePowerOption() {
    storage.get('power', obj => {
        power.checked = obj.power;
        settings.style.display = power.checked
            ? settings.style.display = 'block'
            : settings.style.display = 'none';

    });
    power.onchange = () => {
        storage.set({'power': power.checked});
        settings.style.display = power.checked
            ? settings.style.display = 'block'
            : settings.style.display = 'none';
        sendMsg();
    };
}

function updateSelectedLanguages() {
    storage.get('langFrom', obj => {
        generateLangFromOption();
        lf.value = (obj.langFrom ? obj.langFrom : ENGLISH);
        generateLangToOption();
    });

    lf.oninput = () => {
        storage.set({'langFrom': lf.value});
        storage.set({'langTo': lt.value});
        generateLangToOption();
        sendMsg();
    };

    lt.onchange = () => {
        storage.set({'langTo': lt.value});
        sendMsg();
    };
}

function generateLangFromOption() {
    for (let lang in languages) {
        let op = document.createElement('option');
        op.setAttribute('value', lang);
        op.innerHTML = languages[lang];
        lf.appendChild(op);
    }
}

function generateLangToOption() {
    storage.get('langTo', obj => {
        let lCopy = Object.assign({}, languages); // deep copy
        delete lCopy[lf.options[lf.selectedIndex].value];
        lt.innerHTML = '';
        let op;
        for (let lang in lCopy) {
            op = document.createElement('option');
            op.setAttribute('value', lang);
            op.innerHTML = lCopy[lang];
            lt.appendChild(op);
        }
        op.selected = true;
        for (let i = 0; i < lt.options.length; i++) {
            if (obj.langTo !== undefined && lt.options[i].value === obj.langTo) {
                lt.value = obj.langTo;
            }
        }
    });
}

function updateLevel() {
    storage.get('level', obj => {
        range.value = (obj.level ? obj.level : 0);
        setStageMessage();
    });
    range.oninput = () => {
        storage.set({'level': range.value});
        setStageMessage(range, stage);
        sendMsg();
    };
}

function setStageMessage() {
    if (range.value < 20 && stage.innerText !== L1) fadeTextReplace(stage, L1);
    else if (range.value >= 20 && range.value < 40 && stage.innerText !== L2) fadeTextReplace(stage, L2);
    else if (range.value >= 40 && range.value < 60 && stage.innerText !== L3) fadeTextReplace(stage, L3);
    else if (range.value >= 60 && range.value < 80 && stage.innerText !== L4) fadeTextReplace(stage, L4);
    else if (range.value >= 80 && stage.innerText !== L5) fadeTextReplace(stage, L5);
}

function updateColorScheme() {
    storage.get('color', obj => {
        if (obj.color) {
            for (let i = 0; i < colors.length; i++) {
                if (colors[i].value === obj.color) {
                    colors[i].checked = true;
                }
            }
            color = obj.color;
        }
    });

    for (let i = 0; i < colors.length; i++) {
        colors[i].onclick = function () {
            storage.set({'color': this.value});
            color = this.value;
            sendMsg();
        };
    }
}
