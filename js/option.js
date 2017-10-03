/** --------------------------------------------------------------------------*/

function optionDiv() {
    if (!document.getElementById('option_div')) {
        let div = document.createElement('div');
        div.id = 'option_div';
        fadeInElement(div, '0.7s');
        document.body.appendChild(div);

        div.appendChild(optionLangFrom());
        div.appendChild(optionLangTo());
    }
}

/** --------------------------------------------------------------------------*/

function optionLangFrom() {
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
        document.body.appendChild(div);
        return div;
    }
}

/** --------------------------------------------------------------------------*/

function optionLangTo() {
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
        document.body.appendChild(div);
        return div;
    }
}
