print = console.log

doc = document

randint = (min, max) => (Math.round(Math.random() * (max - min)) + min)


let printQueue = []; // очередь задач для печати
let isPrinting = false; // флаг, указывающий, идет ли в данный момент печать

function printText(text, elementId) {
    const task = {text, elementId};
    printQueue.push(task);
    if (!isPrinting) {
        isPrinting = true;
        printNext();
    }
}

function printNext() {
    if (printQueue.length === 0) {
        isPrinting = false;
        return;
    }
    const task = printQueue.shift();
    const {text, elementId} = task;
    const element = document.getElementById(elementId);
    let index = 0;
    const speed = 20; // скорость печати (миллисекунды)

    function type() {
        element.innerHTML = text.slice(0, index++);
        if (index > text.length) {
            setTimeout(printNext, 1000); // задержка перед следующей задачей
            return;
        }
        setTimeout(type, speed);
    }

    type();
}


function printRandomFromJson(jsonUrl, textId, explanationId) {
    let quoteResp = fetch(jsonUrl).then(function (response) {
        return response.json()
    })
    quoteResp.then(data => {
        let qNum = randint(0, 80)
        let quoteJson = data[qNum]
        let quote = quoteJson["quote"]
        let explanation = quoteJson["explanation"]
        printText(quote, textId)
        printText(explanation, explanationId)
    })

}

let quoteUrl = "static/jsons/diogen_quotes.json";
printRandomFromJson(quoteUrl, "quote-text", "quote-exp")