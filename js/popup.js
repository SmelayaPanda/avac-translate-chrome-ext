window.onload = function () {

    var btn_1 = document.getElementById("btn_1");

    btn_1.addEventListener('click', function () {

        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "btn_1");
            });
        });

    });
};
