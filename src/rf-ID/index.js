const {SerialPort} = require('serialport');
const {initializeApp} = require('firebase/app');
const {getDatabase, set, push, ref} = require("firebase/database");
const {nanoid} = require("nanoid");
const {environment} = require("../environments");

const app = initializeApp(environment.key);

const port = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 9600,

}, (err => err ? console.log(err) : null))

// The open event is always emitted
port.on('open', function () {
    console.log("**** DISPOSITIVO CONECTADO ***")
})

port.on('data', async function (data) {
    console.log(data.toString());
    await writeData(data.toString().replace(/\s/g, ''))
})

async function writeData(value) {
    const database = getDatabase(app);
    await set(ref(database, 'RFID_entries'), {
        data: value
    });
    await set(ref(database, 'RFID_entries'), {
        data: '',
    });
}