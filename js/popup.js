let storage = chrome.storage.sync;

const L1 = "Beginner";
const L2 = "Pre intermediate";
const L3 = "Intermediate";
const L5 = "Advanced";
const L4 = "Upper intermediate";
const WELCOME_MSG = 'Welcome to AVAC!';

let langFromBox;
let langToBox;
let rangeInput;
let strLvl;
let powerAvac;
let settings;

window.onload = function () {
    /* assign HTML elements */
    settings = document.getElementById('settingsAvac');

    langFromBox = document.getElementById('langFrom');
    langToBox = document.getElementById('langTo');
    rangeInput = document.getElementById('avacLevel');
    strLvl = document.getElementById("rangeValue");
    powerAvac = document.getElementById("powerAvac");

    /* Getting Chrome storage value */
    storage.get('langFrom', obj => langFromBox.value = obj.langFrom);
    storage.get('langTo', obj => langToBox.value = obj.langTo);
    storage.get('rangeInput', obj => rangeInput.value = obj.rangeInput);
    storage.get('strLvl', obj => strLvl.innerText = obj.strLvl ? obj.strLvl : WELCOME_MSG);
    storage.get('powerAvac', obj => {
        powerAvac.checked = obj.powerAvac;
        settings.style.display = powerAvac.checked ? settings.style.display = 'block' : settings.style.display = 'none';
    });
    /* Setting Chrome storage value */
    langFromBox.onchange = () => storage.set({'langFrom': langFromBox.value}, () => sendMsg());
    langToBox.onchange = () => storage.set({'langTo': langToBox.value}, () => sendMsg());
    rangeInput.onchange = () => storage.set({'rangeInput': rangeInput.value});
    strLvl.onchange = () => storage.set({'strLvl': strLvl.innerText});
    powerAvac.onchange = () => {
        settings.style.display = powerAvac.checked ? settings.style.display = 'block' : settings.style.display = 'none';
        storage.set({'powerAvac': powerAvac.checked}, () => sendMsg());
    };
    /** ---------------------------------------------------- */
    rangeInput.addEventListener('input', function () {
        if (this.value < 20 && strLvl.innerText !== L1) fadeTextReplace(strLvl, L1);
        else if (this.value >= 20 && this.value < 40 && strLvl.innerText !== L2) fadeTextReplace(strLvl, L2);
        else if (this.value >= 40 && this.value < 60 && strLvl.innerText !== L3) fadeTextReplace(strLvl, L3);
        else if (this.value >= 60 && this.value < 80 && strLvl.innerText !== L4) fadeTextReplace(strLvl, L4);
        else if (this.value >= 80 && strLvl.innerText !== L5) fadeTextReplace(strLvl, L5);
    });

    /* Sending message to content.js */
    rangeInput.addEventListener('input', function () {
        sendMsg();
    })
};

function sendMsg() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        // and use that tab to fill in out title and url
        let obj = {};
        obj.level = rangeInput.value;
        obj.langFrom = langFromBox.value;
        obj.langTo = langToBox.value;
        chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(obj));
    });
}
