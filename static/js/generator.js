print = console.log

doc = document
let quoteTag = doc.getElementById("quote-text")
let expTag = doc.getElementById("quote-exp")

url = "static/jsons/diogen_quotes.json"

randint = (min, max) => (Math.round(Math.random() * (max - min)) + min)

let resp = fetch(url).then(function (response) {
    return response.json()
})
print(resp.then(data => {
    let qNum = randint(0, 80)
    let quoteJson = data[qNum]
    let quote = quoteJson["quote"]
    let explanation = quoteJson["explanation"]
    quoteTag.innerText = quote
    expTag.innerText = explanation
    
    
}))

