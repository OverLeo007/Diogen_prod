print = console.log

doc = document
let quoteTag = doc.getElementById("quote-text")
let expTag = doc.getElementById("quote-exp")

url = "static/jsons/diogen_quotes.json"

randint = (min, max) => (Math.round(Math.random() * (max - min)) + min)


let printQueue = []; // очередь задач для печати
let isPrinting = false; // флаг, указывающий, идет ли в данный момент печать

function printText(text, elementId) {
    const task = { text, elementId };
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
    const { text, elementId } = task;
    const element = document.getElementById(elementId);
    let index = 0;
    const speed = 50; // скорость печати (миллисекунды)

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



function machineTyping(text, elementId) {
    let index = 0;

    function type() {
        
        const typedText = document.getElementById(elementId);
        const currentText = text.slice(0, index);
        typedText.textContent = currentText;
        if (currentText[currentText.length - 1] === '\n') {
            typedText.innerHTML += '<br>';
        }
        if (index < text.length) {
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}


let resp = fetch(url).then(function (response) {
    return response.json()
})
print(resp.then(data => {
    let qNum = randint(0, 80)
    let quoteJson = data[qNum]
    let quote = quoteJson["quote"]
    let explanation = quoteJson["explanation"]
    printText(quote, "quote-text")
    // quoteTag.innerText = quote
    printText(explanation, "quote-exp")


}))

