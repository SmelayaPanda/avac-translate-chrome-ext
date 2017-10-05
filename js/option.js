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

        div.appendChild(createOptionLangFromDiv());
        div.appendChild(createOptionLangToDiv());
        div.appendChild(createInputRangeDiv());
        div.appendChild(createDoItButtonDiv());
        div.appendChild(createOnloadCheckBoxDiv());

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
                let px1 = isClosedOptionDiv ? '24px' : "72px";
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

function createOptionLangFromDiv() {
    if (!document.getElementById('lang_from_div')) {
        let div = document.createElement('div');
        let select = document.createElement('select');
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        div.id = 'lang_from_div';
        select.id = 'lang_from_option';
        select.title = 'Lang from';
        option1.value = 'eng';
        option2.value = 'rus';
        option1.innerText = 'English';
        option2.innerText = 'Russian';
        select.appendChild(option1);
        select.appendChild(option2);
        div.appendChild(select);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/

function createOptionLangToDiv() {
    if (!document.getElementById('lang_to_div')) {
        let div = document.createElement('div');
        let select = document.createElement('select');
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        div.id = 'lang_to_div';
        select.id = 'lang_to_option';
        select.title = 'Lang from';
        option1.value = 'eng';
        option2.value = 'rus';
        option1.innerText = 'English';
        option2.innerText = 'Russian';

        select.appendChild(option1);
        select.appendChild(option2);
        div.appendChild(select);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/

function createInputRangeDiv() {
    if (!document.getElementById('level_div')) {
        let div = document.createElement('div');
        let input = document.createElement('input');
        div.id = 'level_div';
        input.type = 'range';
        input.id = 'avacLevel';
        input.value = '0';
        input.title = 'Language level';

        div.appendChild(input);
        fadeInElement(div, '0.7s');
        return div;
    }
}

/** --------------------------------------------------------------------------*/

function createDoItButtonDiv() {
    if (!document.getElementById('doit_div')) {
        let div = document.createElement('div');
        let button = document.createElement('button');
        div.id = 'doit_div';
        button.id = 'doit_button';
        button.innerText = 'do it!';

        div.appendChild(button);
        fadeInElement(div, '0.7s');
        return div;
    }
}


function createOnloadCheckBoxDiv() {
    if (!document.getElementById('onload_div')) {
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');
        div.id = 'onload_div';
        input.type = 'checkbox';
        input.id = 'onload_checkbox';
        label.htmlFor = 'onload_checkbox';
        label.title = 'Translate using last parameters after page loading';
        label.innerText = 'Onload-mode';

        div.appendChild(input);
        div.appendChild(label);
        fadeInElement(div, '0.7s');
        return div;
    }
}

