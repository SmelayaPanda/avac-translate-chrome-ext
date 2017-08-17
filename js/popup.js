function buttonHandler(buttonName) {
    let select_1 = document.getElementById('langFrom');
    let selected_1 = select_1.options[select_1.selectedIndex].value;

    let select_2 = document.getElementById('langTo');
    let selected_2 = select_2.options[select_2.selectedIndex].value;

    // Send message to content.js
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, buttonName + " " + selected_1 + " " + selected_2);
        });
    });
}
window.onload = function () {
// -------------------------------------------------------------------------
    let btn_1 = document.getElementById("btn_1");
    btn_1.addEventListener('click', function () {
        buttonHandler("btn_1");
    });
// -------------------------------------------------------------------------
    let btn_2 = document.getElementById("btn_2");
    btn_2.addEventListener('click', function () {
        buttonHandler("btn_2");
    });
// -------------------------------------------------------------------------
    let btn_3 = document.getElementById("btn_3");
    btn_3.addEventListener('click', function () {
        buttonHandler("btn_3");
    });
// -------------------------------------------------------------------------
    let btn_4 = document.getElementById("btn_4");
    btn_4.addEventListener('click', function () {
        buttonHandler("btn_4");
    });
// -------------------------------------------------------------------------
    let btn_5 = document.getElementById("btn_5");
    btn_5.addEventListener('click', function () {
        buttonHandler("btn_5");
    });
};
