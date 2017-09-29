/** --------------------------------------------------------------------------*/
function createCloseDiv() {
    let div = document.createElement('div');
    let span = document.createElement('span');
    div.id = 'close_div';
    span.id = 'close_span';
    span.innerText = "";
    div.appendChild(span);
    document.body.appendChild(div);

    let closeDiv = document.getElementById('close_div');
    closeDiv.onclick = function () {
        let infoDiv = document.getElementById('info_div');
        let speakWordDiv = document.getElementById('speak_word_div');
        let exampleWordDiv = document.getElementById('example_word_div');
        let exampleSentenceDiv = document.getElementById('example_sentence_div');

        if (infoDiv.style.opacity === '1') {
            infoDiv.style.opacity = '0';
            speakWordDiv.style.opacity = '0';
            exampleWordDiv.style.opacity = '0';
            exampleSentenceDiv.style.opacity = '0';
        } else {
            infoDiv.style.opacity = '1';
            speakWordDiv.style.opacity = '1';
            exampleWordDiv.style.opacity = '1';
            exampleSentenceDiv.style.opacity = '1';
        }
    }
}

/** --------------------------------------------------------------------------*/
function createSideNavDiv() {
    let div = document.createElement('div');
    let button = document.createElement('button');
    div.id = 'side_div';
    button.id = 'side_div_button';
    button.innerText = 'Avac';
    div.appendChild(button);
    document.body.appendChild(div);
}


/** --------------------------------------------------------------------------*/
function createInfoDiv() {
    let div = document.createElement('div');
    div.style.opacity = '0';
    div.id = 'info_div';
    div.classList.add('footerAvac');
    document.body.appendChild(div);
}

/** --------------------------------------------------------------------------*/
function createSpeakWordDiv() {
    let div = document.createElement('div');
    let button = document.createElement('button');
    div.style.opacity = '0';
    div.id = 'speak_word_div';
    button.id = 'speak_word_button';
    button.innerText = 'Your word is here!';
    div.classList.add('footerAvac');
    div.appendChild(button);
    document.body.appendChild(div);

    addSpeakerOnClick(button);
}

/** --------------------------------------------------------------------------*/
function createExampleWordDiv() {
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');

    div.classList.add('footerAvac');
    div.style.opacity = '0';
    div.id = 'example_word_div';
    ul.id = 'example_word_ul';
    li1.id = 'example_word_li_1';
    li2.id = 'example_word_li_2';
    li3.id = 'example_word_li_3';

    ul.innerText = 'Synonyms';
    li1.innerText = 'Example 1';
    li2.innerText = 'Example 2';
    li3.innerText = 'Example 3';

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    div.appendChild(ul);
    document.body.appendChild(div);

    addSpeakerOnClick(li1);
    addSpeakerOnClick(li2);
    addSpeakerOnClick(li3);
}

/** --------------------------------------------------------------------------*/
function createExampleSentenceDiv() {
    let div = document.createElement('div');
    let span = document.createElement('span');
    div.style.opacity = '0';
    div.id = 'example_sentence_div';
    span.id = 'example_sentence_span';
    div.classList.add('footerAvac');
    span.innerText = 'Fool sentence with max priority! And bla and np bla, just relax, sentence is to large, and and and it\'not all,\n' +
        '            for test, stop, yes\n' +
        '            Oh no, more more, words cache =) and hello world example';
    div.appendChild(span);
    document.body.appendChild(div);

    addSpeakerOnClick(span);
}

/** --------------------------------------------------------------------------*/
function addSpeakerOnClick(elem) {
    elem.onclick = function () {
        speakWord(elem.innerText, 'en-GB', 0.8, 0.8, 1, 'native');
    };
}

/** --------------------------------------------------------------------------*/


/** --------------------------------------------------------------------------*/

/*
function createFooterAvac() {
    let footer = document.createElement('footer');
    footer.id = 'footerAvac';
    footer.innerHTML =
        `<div>
    <div id="emptyBlockAvac">
    </div>
    <div id="translatedWordAvac">
        <button id="playWordBtnAvac" type="button">
            <strong id="playWordAvac">Your word is here!</strong></button>
    </div>
    <div id="synonymsAvac"><span style="color: grey"> Synonyms </span>
        <li class="synonymsAvac" id="avacSynonyms_1">yes one</li>
        <li class="synonymsAvac" id="avacSynonyms_2">may be two</li>
        <li class="synonymsAvac" id="avacSynonyms_3">and three</li>
    </div>
    <div id="sentenceExampleAvac">
        Fool sentence with max priority! And bla and np bla, just relax, sentence is to large, and and and it'not all,
        for test, stop, yes
        Oh no, more more, words casha =) and hello world example
    </div>
</div>`;
    createSideNavDiv();
    footer.style.opacity = '0';
    footer.style.borderTop = 'solid gray 1px';
    fadeInElement(footer, 0);
    document.body.style.marginBottom = '10rem';
    document.body.appendChild(footer);

    document.getElementById('sentenceExampleAvac').onclick = function () {
        speakWord(document.getElementById('sentenceExampleAvac').innerText, 'en-GB', 0.8, 0.8, 1, 'native');
    };

    let synonyms = document.getElementsByClassName('synonymsAvac');
    for (let s in synonyms) {
        synonyms[s].onclick = function () {
            speakWord(synonyms[s].innerText, 'en-GB', 0.8, 0.8, 1, 'native');
        }
    }
}*/

/** --------------------------------------------------------------------------
 * Creation button for close/open all footers
 **/


