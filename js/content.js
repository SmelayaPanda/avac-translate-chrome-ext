/** --------------
 * Listen popup.js
 */
window.onload = function()
{
    chrome.storage.sync.get('onLoadCheckBox', function(obj)
    {
        if(obj.onLoadCheckBox)
        {
            let level;
            let langFrom;
            let langTo;

            chrome.storage.sync.get('rangeInput', function(obj)
            {
                obj.rangeInput ? level = obj.rangeInput : level = 0;
                chrome.storage.sync.get('langFrom', function(obj)
                {
                    obj.langFrom ? langFrom = obj.langFrom : 'eng';
                    chrome.storage.sync.get('langTo', function(obj)
                    {
                        obj.langTo ? langTo = obj.langTo : 'eng';
                        avacPost(level, langFrom, langTo);
                    });
                });
            });
        }
    });

    chrome.runtime.onMessage.addListener(
        msgObj =>
        {
            let params = JSON.parse(msgObj);
            avacPost(params.level, params.langFrom, params.langTo);
        });
};

/** ------------------------------------------------------------------ */
function avacPost(level, langFrom, langTo)
{
    createAvacFooter();
    const url = "https://panda.jelastic.regruhosting.ru/avac/";
    const req = new XMLHttpRequest();
    const params =
        "goto=" + encodeURIComponent(document.URL) + "&" +
        "level=" + level + "&" +
        "langFrom=" + langFrom + "&" +
        "langTo=" + langTo;

    console.log(params);
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function()
    {
        let myDictionary;
        if(this.readyState === 4 && this.status === 200)
        {
            myDictionary = JSON.parse(this.responseText);
            if(document.readyState === 'complete')
            {
                translateText(myDictionary);
            }
        }
    };
    req.send(params);
}

/** ------------------------------------------------------------------ */
function translateText(myDictionary)
{
    if(document.getElementsByClassName("wordAvac"))
    {
        removeElementsByClass("wordAvac")
    }
    let words;
    let text;
    let paragraphs = document.getElementsByTagName("p");
    for(let i = 0; i < paragraphs.length; i++)
    {
        text = paragraphs[i].textContent;
        text = text
            .replace(text.charAt(0), ' ' + text.charAt(0)) // Begin of the paragraph
            .replace(text.charAt(text.length - 1), text.charAt(text.length - 1) + ' ')
            .replace(/\./g, ' .')
            .replace(/,/g, ' ,')
            .replace(/:/g, ' :')
            .replace(/;/g, ' ;')
            .replace(/!/g, ' !')
            .replace(/\?/g, ' ?')
            .replace(/\(/g, ' ;')
            .replace(/\)/g, ' ;')
            .replace(/\s+/g, '  ');

        words = text
            .replace(/[.,!;:?()]/g, " ")
            .replace(/\s+/g, ' ')
            .split(' ');

        for(let w in words)
        {
            text = text.replace(' ' + words[w] + ' ',
                `<span class="mainWordAvac ___${words[w].toLowerCase()}"> ${words[w]} </span> `);
        }
        paragraphs[i].innerHTML = text;
    }

    let classWords;
    for(let key in myDictionary)
    {
        classWords = document.getElementsByClassName("___" + key);
        for(let cw in classWords)
        {
            classWords[cw].innerHTML =
                `${classWords[cw].innerText} <span class='wordAvac'>[&nbsp${myDictionary[key]}&nbsp]</span>`;
        }
    }

    let avacWords = document.querySelectorAll('[class*=___]');
    for(let av in avacWords)
    {
        avacWords[av].onclick = function()
        {
            document.getElementById('playWordAvac').innerText =
                    avacWords[av].textContent.substring(0,
                        avacWords[av].textContent.indexOf('[') - 1).trim().toUpperCase();
        }
    }
}

/** ------------------------------------------------------------------ */
function removeElementsByClass(className)
{
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0)
    {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/** ------------------------------------------------------------------ */
function createAvacFooter()
{
    let footer = document.createElement('footer');
    footer.id = 'footerAvac';

    footer.innerHTML =

        `
<div id="footerContentAvac">
    <div id="translatedWordAvac">
        <audio id="audioAvac"
        <source src="http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/0/1UXRDYLWQWCBT.mp3"
                type='audio/mp3'>
        Your user agent does not support the HTML5 Audio element.
        </audio>
        <button id="playWordAvac" type="button" onclick="audioAvac.play()">
            <strong>Yours word is here!</strong>
        </button>
    </div>

    <div id="synonymsAvac"> Synonyms
        <li id="avacSynonyms_1">example one</li>
        <li id="avacSynonyms_2">example two</li>
        <li id="avacSynonyms_3">example three</li>
    </div>

    <div id="sentenceExampleAvac">
        Fool sentence with max priority!
    </div>

</div>
`;
    document.body.appendChild(footer);
}
/** ------------------------------------------------------------------ */


