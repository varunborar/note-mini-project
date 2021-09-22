const fs = require('fs');

const arguments = process.argv.slice(2);
const operation = arguments[0];

switch (operation) {
    case 'add':
        add(...arguments.slice(1));
        break;
    case 'remove':
        remove(...arguments.slice(1));
        break;
    case 'list':
        list();
        break;
    case 'read':
        read(...arguments.slice(1));
        break;
    default:
        console.log('Invalid option');
        break;
}

async function add(title, body) {
    const note = {
        'title': title.slice(8),
        'body': body.slice(7)
    }
    let Notes = parseFile();
    Notes.push(note);
    fs.writeFile('./Notes.json', JSON.stringify(Notes), err => { if (err) console.log("Error in writing") });
    console.log("New Note Created!");
}

function remove(title) {
    title = title.slice(8);
    let Notes = parseFile();
    if (Notes.length === 0) {
        console.log("No Notes Found");
    } else {
        const newNotes = [];
        for (let note of Notes) {
            if (note['title'] === title) {
                console.log("Note removed!");
                continue;
            } else {
                newNotes.push(note);
            }
        }
        fs.writeFile('./Notes.json', JSON.stringify(newNotes), err => { if (err) console.log("Error in writing") });
    }
}

function read(title) {
    title = title.slice(8);
    let Notes = parseFile();
    if (Notes.length === 0) {
        console.log("No Notes Found");
    } else {
        const newNotes = [];
        for (let note of Notes) {
            if (note['title'] === title) {
                console.log(note['title'], note['body']);
                break;
            }
        }
    }
}

function list() {
    const Notes = parseFile();
    for (var note of Notes) {
        console.log(note['title']);
    }
}

function parseFile() {
    const rawData = fs.readFileSync('./Notes.json');
    const Data = JSON.parse(rawData);
    if (Data.length === 0)
        return [];
    return Data;
}