window.onload = function () {
    const url = "http://localhost:8080/avac";
    const req = new XMLHttpRequest();
    const params = "goto=" + document.URL;
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let myDictionary = JSON.parse(this.responseText);
            console.log(myDictionary);

            console.log("Start");

            let paragraphs = document.getElementsByTagName("p");
            for (let i = 0; i < paragraphs.length; i++) {
                let text = paragraphs[i].textContent;

                for (let key in myDictionary) {
                    if (myDictionary.hasOwnProperty(key)) {
                        text = text.replace(key,
                            `${key} [ <span style="color: green"><i>${myDictionary[key]}</i></span>]`);
                    }
                }

                paragraphs[i].innerHTML = text;
            }
            console.log("Complete");

        }
    };
    req.send(params);
};
