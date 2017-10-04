let sideDiv;
let fullFooter;
let isClosedOptionDiv = false;

/** --------------------------------------------------------------------------*/

function optionDiv() {
    if (!document.getElementById('option_div')) {
        let div = document.createElement('div');
        div.id = 'option_div';
        fadeInElement(div, '0.7s');
        document.body.appendChild(div);

        div.appendChild(createOptionLangFrom());
        div.appendChild(createOptionLangTo());

        sideDiv = createSideNavDiv();
        sideDiv.onclick = function () {
            if (div.style.opacity === '1') {
                div.style.opacity = '0';
                isClosedOptionDiv = true;
            }
            else {
                div.style.opacity = '1';
                isClosedOptionDiv = false;
            }
            fullFooter = document.getElementById('full_footer');
            if (fullFooter.style.opacity === '1') {
                let px1 = isClosedOptionDiv === '0' ? '24px' : "72px";
                infoDiv.style.marginBottom = px1;
                speakWordDiv.style.marginBottom = px1;
                textLevelDiv.style.marginBottom = px1;
                exampleWordDiv.style.marginBottom = px1;
                exampleSentenceDiv.style.marginBottom = px1;
            }
        }
    }
}

/** --------------------------------------------------------------------------*/
function createSideNavDiv() {
    if (!document.getElementById('side_div')) {
        let div = document.createElement('div');
        let button = document.createElement('button');
        div.id = 'side_div';
        button.id = 'side_div_button';
        button.innerText = 'Option';
        div.appendChild(button);
        document.body.appendChild(div);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/

function createOptionLangFrom() {
    if (!document.getElementById('option_lang_from')) {
        let div = document.createElement('div');
        let select = document.createElement('select');
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        select.id = 'option_lang_from';
        select.title = 'Lang from';
        option1.value = 'eng';
        option2.value = 'rus';
        option1.innerText = 'English';
        option2.innerText = 'Russian';
        div.id = 'option_lang_from';

        select.appendChild(option1);
        select.appendChild(option2);
        div.appendChild(select);
        fadeInElement(div, '0.7s');
        return div;
    }
}
/** --------------------------------------------------------------------------*/

function createOptionLangTo() {
    if (!document.getElementById('option_lang_to')) {
        let div = document.createElement('div');
        let select = document.createElement('select');
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        select.id = 'option_lang_to';
        select.title = 'Lang from';
        option1.value = 'eng';
        option2.value = 'rus';
        option1.innerText = 'English';
        option2.innerText = 'Russian';
        div.id = 'option_lang_to';

        select.appendChild(option1);
        select.appendChild(option2);
        div.appendChild(select);
        fadeInElement(div, '0.7s');
        return div;
    }
}
