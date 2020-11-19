const fs = require('fs');
const readline = require('readline');


let names = [];

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

fs.readFile('./names.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }

    const obj = JSON.parse(data);
    names = obj.names;
});

const printRandomName = () => {
    console.log(randomElement(names) + ' is your random name!\n\n');
    interface.question('Type 1 to get a random name, 2 to add a name to the list. Anything else quits.\n\n', handleAnswer);
}

const addName = (name) => {
    names.push(name);
    const obj = {names: names}
    const data = JSON.stringify(obj, null, 2);
    fs.writeFile('./names.json', data, 'utf8', (err) => {
        if (err) {
            console.log(error);
            return;
        }

        console.log(`${name} was added!\n\n`)
        interface.question('Type 1 to get a random name, 2 to add a name to the list. Anything else quits.\n\n', handleAnswer);
    })
}

const handleAnswer = (answer) => {
    if (answer === '1') {
        printRandomName();
    } else if (answer === '2') {
        interface.question('What name would you like to add?\n\n', addName)
    } else {
        console.log('Quitting...');
        interface.close();
    }
}

interface.question('Type 1 to get a random name, 2 to add a name to the list. Anything else quits.\n\n', handleAnswer);
