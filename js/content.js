//файл скрипта, который запускается на каждой странице отдельно

function onBlur() { // окно теряет фокус
    chrome.runtime.sendMessage({site: sait, time: localStorage[sait]}); // отправка сообщения на background.js
    localStorage[sait] = '0';
}
window.onblur = onBlur; // если окно теряет фокус
function sec() //выполняется каждую секунду
{
    if (document.webkitVisibilityState == 'visible')//если страница активна
    {
        localStorage[sait] = parseInt(localStorage[sait], 10) + 1; // обновляем данные о сайте в локальном хранилище
    }
}
var sait = location.hostname; // на каком сайте находится скрипт
localStorage[sait] = '0';
setInterval(sec, 1000);// запускать функцию каждую секунду
