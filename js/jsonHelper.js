const FROM = 0;
const TO = 16;

function getFiveValuesRandomFomSequence(from, to, except) {
    var arr = [];

    function checkForUnique(number) {
        return arr.includes(number) || except == number;
    }

    function getRandomValues() {
        var value;
        while (checkForUnique(value = (Math.floor(Math.random() * (to + from)) - from))) {
        }
        return value;
    }

    for (let i = 0; i < 5; i++) {
        arr.push(getRandomValues());
    }

    return arr;
}

for (let i = FROM; i < TO; i++) {
    console.log(`${i}) "relatedProductIds": [${getFiveValuesRandomFomSequence(FROM, TO, i)}],`);
}