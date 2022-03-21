const {SerialPort} = require('serialport');
const {initializeApp} = require('firebase/app');
const {getDatabase, set, push, ref} = require("firebase/database");
const {nanoid} = require("nanoid");

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkXP_tDYuOJ2-k5etLKnEq_zdYTxBxlWs",
    authDomain: "iot---js.firebaseapp.com",
    databaseURL: "https://iot---js-default-rtdb.firebaseio.com",
    projectId: "iot---js",
    storageBucket: "iot---js.appspot.com",
    messagingSenderId: "825513689168",
    appId: "1:825513689168:web:e9751cccf05343ef7f5155"
};

const app = initializeApp(firebaseConfig);

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