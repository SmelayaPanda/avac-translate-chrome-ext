let strg = chrome.storage.sync;

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

    /* Setting Chrome storage value */
    langFromBox.onchange = () => strg.set({'langFrom': langFromBox.value});
    langToBox.onchange = () => strg.set({'langTo': langToBox.value});
    rangeInput.onchange = () => strg.set({'rangeInput': rangeInput.value});
    strLvl.onchange = () => strg.set({'strLvl': strLvl.innerText});
    powerAvac.onchange = () => {
        strg.set({'powerAvac': powerAvac.checked});
        settings.style.display = powerAvac.checked ? settings.style.display = 'block' : settings.style.display = 'none';
    };

    /* Getting Chrome storage value */
    strg.get('langFrom', obj => langFromBox.value = obj.langFrom ? obj.langFrom : 'eng');
    strg.get('langTo', obj => langToBox.value = obj.langTo ? obj.langTo : 'eng');
    strg.get('rangeInput', obj => rangeInput.value = obj.rangeInput ? obj.rangeInput : 0);
    strg.get('strLvl', obj => strLvl.innerText = obj.strLvl ? obj.strLvl : WELCOME_MSG);
    strg.get('powerAvac', obj => powerAvac.checked = obj.powerAvac ? obj.powerAvac : powerAvac.checked);
    /** ---------------------------------------------------- */
    rangeInput.addEventListener('input', function () {
        if (this.value < 20 && strLvl.innerText !== L1) fadeTextReplace(strLvl, L1);
        else if (this.value >= 20 && this.value < 40 && strLvl.innerText !== L2) fadeTextReplace(strLvl, L2);
        else if (this.value >= 40 && this.value < 60 && strLvl.innerText !== L3) fadeTextReplace(strLvl, L3);
        else if (this.value >= 60 && this.value < 80 && strLvl.innerText !== L4) fadeTextReplace(strLvl, L4);
        else if (this.value >= 80 && strLvl.innerText !== L5) fadeTextReplace(strLvl, L5);
    });

    /* Sending message to content.js */
    if (powerAvac.checked) {
        sendMsg();
        rangeInput.addEventListener('input', function () {
            sendMsg();
        })
    }
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
