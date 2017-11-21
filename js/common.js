/** --------------------------------------------------------------------------
 * Remove element
 * @param className
 **/
function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/** --------------------------------------------------------------------------
 * Fade In/Out any element
 * @param el
 * @param transition
 **/
function fadeOutElement(el, transition) {
    el.style.opacity = '1';
    el.style.transition = transition;
    setTimeout(function () {
        el.style.opacity = '0';
    }, 0);
}

function fadeInElement(el, transition) {
    el.style.opacity = '0';
    el.style.transition = transition;
    setTimeout(function () {
        el.style.opacity = '1';
    }, 0);
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

/** --------------------------------------------------------------------------
 * Speak word use SpeechSynthesisUtterance
 * @param word
 * @param lang
 * @param volume
 * @param rate
 * @param pitch
 * @param voiceURI
 **/
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

/** --------------------------------------------------------------------------
 * Custom speaker for clicked element
 * @param elem
 * */
function addSpeakerOnClick(elem) {
    elem.onclick = function () {
        speakWord(elem.innerText.split('[')[0], 'en-GB', 0.8, 0.8, 1, 'native');
        speakWord(elem.innerText.split('[')[1], 'ru', 0.8, 0.8, 1, 'native');
    };
}

/** -----------------------------------------------------------------------------------
 * Fill up text content of the close footer
 * @param langFrom
 * @param langTo
 * @param level
 * @param dictLength
 **/
function fillUpCloseFooterContent(langFrom, langTo, level, dictLength) {
    let text =
        langFrom.toUpperCase() + " to " +
        langTo.toUpperCase() +
        "   Level: " + level +
        " . Translated words: " + dictLength;
    let i = 0;
    let speed = 40;
    document.getElementById("close_div").innerHTML = "";

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("close_div").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
}