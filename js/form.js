// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbPn7WVhHjPVDLzH7Wd-EDesXINZe7_tg",
    authDomain: "evolvemidia-4ad05.firebaseapp.com",
    databaseURL: "https://evolvemidia-4ad05.firebaseio.com",
    projectId: "evolvemidia-4ad05",
    storageBucket: "evolvemidia-4ad05.appspot.com",
    messagingSenderId: "796346727409"
};
firebase.initializeApp(config);
var db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

// Referenciar db "leads" no firestore
var ref = db.collection('leads').doc();

// Esperar o carregamento completo da página antes de qualquer coisa
document.addEventListener('DOMContentLoaded', function() {

    // Executar envio ao banco de dados quando o usuário pressionar o botão
    document.querySelector("#captura").onclick = function() {

        var email = document.getElementById('email').value;
        var nome = document.getElementById('nome').value;
        var tipo = "B2C";

        var dominios = {
            "@yahoo.com": 1,
            "@yahoo.com.br": 1,
            "@ymail.com": 1,
            "@rocketmail.com": 1,
            "@gmail.com": 1,
            "@bol.com.br": 1,
            "@hotmail.com": 1,
            "@outlook.com": 1,
            "@msn.com": 1,
            "@hotmail.com.br": 1,
            "@live.com": 1,
            "@ig.com.br": 1,
            "@globomail.com": 1,
            "@oi.com.br": 1,
            "@pop.com.br": 1,
            "@inteligweb.com.br": 1,
            "@r7.com": 1,
            "@folha.com.br": 1,
            "@zipmail.com.br": 1,
            "@zoho.com": 1,
            "@uol.com": 1,
            "@terra.com.br": 1,
            "@uol.com.br": 1,
            "@icloud.com": 1,
        }

        var index = email.search('@');
        var sli = email.slice(index);
        if (dominios[sli] === undefined) {
            tipo = 'B2B';
        }
        var d = new Date();
        var dia = ("0" + (d.getDate())).slice(-2);
        var mes = ("0" + (d.getMonth() + 1)).slice(-2);
        var data = d.getFullYear() + '-' + mes + '-' + dia;

        var atual = new Date();
        var diferenca = -(atual.getTimezoneOffset() / 60);
        var hora = new Date(new Date().getTime() + diferenca * 3600 * 1000).toUTCString().replace(/ GMT$/, "");
        hora = hora.slice(-8);

        var data_hora = data + ' ' + hora;
        var ip = "";

        // Salvar endereco ip
        $.getJSON('https://jsonip.com/?callback=?', function(data) {
            ip = data.ip;

            if (nome.length > 2 && email.length > 4) {
                // Enviar para o banco de dados
                var envio = ref.set({
                	email: email,
                	nome: nome,
                	ip: ip,
                	tipo: tipo,
                	data_hora: data_hora
                });
                document.querySelector(".box-button").style.display = "none";
                document.querySelector(".alerta").style.display = "block";
                document.querySelector(".form-input").value = "";
                document.querySelector(".f2").value = "";

                if (window.location.href.search('e-book.html') >= 0) {
                    window.location = "https://www.evolvemidia.com.br/obrigado.html"
                }
                localStorage.clear();
                return false;
            }

            return false;
        });
    }
    return false
});