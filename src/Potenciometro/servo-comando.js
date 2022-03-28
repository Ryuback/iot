const {Board, Servo} = require("johnny-five");
const {initializeApp} = require('firebase/app');
const {getDatabase, onValue, ref} = require("firebase/database");
const board = new Board();// constante que controla o arduino

const firebaseConfig = {
    // aqui a chave que foi gerada no firebase para ligar a aplicação ao banco na nuvem
    apiKey: "AIzaSyDqbr3hbDP3yJfNoij-VtgyswtQpf9IcPA",
    authDomain: "tranca-40953.firebaseapp.com",
    projectId: "tranca-40953",
    storageBucket: "tranca-40953.appspot.com",
    messagingSenderId: "656788157614",
    appId: "1:656788157614:web:fd7633599b3bcde027a93f",
    measurementId: "G-3KGNCY9CCB"
};

const app = initializeApp(firebaseConfig);

board.on("ready", async () => {//indica a leitura da placa arduino
    const servo = new Servo(10);//indica em qual porta do arduino esta o servo motor

    board.repl.inject({//esse metodo permitem o controle do led pelo Pronpt de comando
        servo  //acesso ao led pelo prompt onde podemos passar valores como parâmetro
    });

    const database = getDatabase(app);

    onValue(ref(database, 'servo/estado'), snapshot => {
        const svMotor = snapshot.val();
        console.log(svMotor)
        if (svMotor == 'on') {
            servo.to(180);
        } else if (svMotor == 'off') {
            servo.to(0);
        }
    })
});