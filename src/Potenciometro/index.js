const {Board, Sensor, Led, Sensors} = require("johnny-five");
const {initializeApp} = require('firebase/app');
const {getDatabase, set, ref} = require("firebase/database");
const {environment} = require("../environments");
const app = initializeApp(environment.key);
const board = new Board();

board.on("ready", (r) => {
    console.log("***DISPOSITIVO CONECTADO***");
    const sensor = new Sensors([5, 4]);
    console.log(sensor)
    // sensor.on("change", v => {
    //     console.log(v);
    // })
    // const potentiometer = new Sensor("A3");
    // const led13 = new Led("13");
    //
    // led13.blink(1000);
    //
    // potentiometer.on("change", () => {
    //     const {value, raw} = potentiometer;
    //     writeData(value);
    //     console.log("Sensor: ");
    //     console.log("  value  : ", value);
    //     console.log("  raw    : ", raw);
    //     console.log("-----------------");
    // });
});

board.on("error", (e) => {
    console.log(e)
})

function writeData(value) {
    const database = getDatabase(app);
    set(ref(database, 'potentiometer/'), {
        data: value,
    });
}