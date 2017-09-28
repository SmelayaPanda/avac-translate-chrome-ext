/** --------------------------------------------------------------------------
 * Fade in and Out for content footer
 * @param className
 **/
function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
/** --------------------------------------------------------------------------
 * Load fonts from google API
 * @param param.familyt and other
 **/
let fontLoader = function (param) {
    let headID = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    headID.appendChild(link);

    link.href = 'http://fonts.googleapis.com/css?family=' + param.familyt;
};
/** -----------------------------------------------------------------------------------
 * Speak word use SpeechSynthesisUtterance
 * @param word
 * @param lang
 * @param volume
 * @param rate
 * @param pitch
 * @param voiceURI
 **/
/** --------------------------------------------------------------------------
 * Fade In/Out any element
 * @param el
 * @param time
 **/
function fadeOutElement(el, time) {
    setTimeout(function () {
        el.style.opacity = '0';
    }, time);
}

function fadeInElement(el, time) {
    setTimeout(function () {
        el.style.opacity = '1';
    }, time);
}
/** --------------------------------------------------------------------------
 * Fade-replace for text
 * @param element
 * @param newValue
 **/
function fadeTextReplace(element, newValue) {
    element.classList.add('hide');
    setTimeout(function () {
        element.innerHTML = newValue;
    }, 200);
    setTimeout(function () {
        element.classList.remove('hide');
    }, 500);
}

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