let infoDiv;
let speakWordDiv;
let textLevelDiv;
let exampleWordDiv;
let exampleSentenceDiv;


/** --------------------------------------------------------------------------*/

function createFullFooter() {
    let px0;
    if (!document.getElementById('full_footer')) {
        let div = document.createElement('div');
        div.id = 'full_footer';
        div.style.opacity = '1';

        infoDiv = createInfoDiv();
        speakWordDiv = createSpeakWordDiv();
        textLevelDiv = createDelimiterDiv();
        exampleWordDiv = createExampleWordDiv();
        exampleSentenceDiv = createExampleSentenceDiv();

        div.appendChild(infoDiv);
        div.appendChild(speakWordDiv);
        div.appendChild(textLevelDiv);
        div.appendChild(exampleWordDiv);
        div.appendChild(exampleSentenceDiv);
        document.body.appendChild(div);

        fadeInElement(div, '0.7s');

        if (document.getElementById('option_div')) {
            px0 = isClosedOptionDiv ? '24px' : '72px';
            infoDiv.style.marginBottom = px0;
            speakWordDiv.style.marginBottom = px0;
            textLevelDiv.style.marginBottom = px0;
            exampleWordDiv.style.marginBottom = px0;
            exampleSentenceDiv.style.marginBottom = px0;
        }
    }
}

/** --------------------------------------------------------------------------*/
function createCloseDiv() {
    if (!document.getElementById('close_div')) {
        let px0;
        let div = document.createElement('div');
        let span = document.createElement('span');
        div.id = 'close_div';
        span.id = 'close_span';
        span.innerText = "";
        div.appendChild(span);
        document.body.appendChild(div);

        let closeDiv = document.getElementById('close_div');
        closeDiv.onclick = function () {

            px0 = isClosedOptionDiv ? '24px' : '72px';
            infoDiv.style.marginBottom = px0;
            speakWordDiv.style.marginBottom = px0;
            textLevelDiv.style.marginBottom = px0;
            exampleWordDiv.style.marginBottom = px0;
            exampleSentenceDiv.style.marginBottom = px0;

            let fullFooter = document.getElementById('full_footer');
            if (fullFooter.style.opacity === '1') {
                fullFooter.style.opacity = '0';
                document.body.style.marginBottom = '24px'
            } else {
                fullFooter.style.opacity = '1';
                document.body.style.marginBottom = '144px'
            }
        };
        return div;
    }
}

/** --------------------------------------------------------------------------*/
function createDelimiterDiv() {
    if (!document.getElementById('delimiter_div')) {
        let div = document.createElement('div');
        div.style.borderTop = 'solid grey 1px';
        div.id = 'delimiter_div';
        document.body.appendChild(div);
        fadeInElement(div, '0.7s');
        return div;
    }
}


/** --------------------------------------------------------------------------*/
function createInfoDiv() {
    if (!document.getElementById('info_div')) {
        let div = document.createElement('div');
        div.style.opacity = '0';
        div.id = 'info_div';
        div.classList.add('footerAvac');

        document.body.appendChild(div);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/
function createSpeakWordDiv() {
    if (!document.getElementById('speak_word_div')) {
        let div = document.createElement('div');
        let button = document.createElement('button');
        div.id = 'speak_word_div';
        button.id = 'speak_word_button';
        button.innerText = 'Your word is here!';
        div.classList.add('footerAvac');
        div.appendChild(button);
        addSpeakerOnClick(button);
        document.body.appendChild(div);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/
function createExampleWordDiv() {
    if (!document.getElementById('example_word_div')) {
        let div = document.createElement('div');
        let ul = document.createElement('ul');
        let li1 = document.createElement('li');
        let li2 = document.createElement('li');
        let li3 = document.createElement('li');

        div.classList.add('footerAvac');
        div.id = 'example_word_div';
        ul.id = 'example_word_ul';
        li1.id = 'example_word_li_1';
        li2.id = 'example_word_li_2';
        li3.id = 'example_word_li_3';

        li1.classList.add('exampleWordLi');
        li2.classList.add('exampleWordLi');
        li3.classList.add('exampleWordLi');

        ul.innerText = 'Synonyms';
        li1.innerText = 'Example 1';
        li2.innerText = 'Example 2';
        li3.innerText = 'Example 3';

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        div.appendChild(ul);

        addSpeakerOnClick(li1);
        addSpeakerOnClick(li2);
        addSpeakerOnClick(li3);
        document.body.appendChild(div);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/
function createExampleSentenceDiv() {
    let div = document.createElement('div');
    let span = document.createElement('span');
    div.id = 'example_sentence_div';
    span.id = 'example_sentence_span';
    div.classList.add('footerAvac');
    span.innerText = 'Fool sentence with max priority! And bla and np bla, just relax, sentence is to large, and and and it\'not all,\n' +
        '             for test, stop, yes\n' +
        '             Oh no, more more, words cache =) and hello world example';
    div.appendChild(span);
    addSpeakerOnClick(span);
    document.body.appendChild(div);
    fadeInElement(div, '0.7s');
    return div;
}


/** --------------------------------------------------------------------------*/




