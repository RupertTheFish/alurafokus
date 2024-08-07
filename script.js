// Varíaveis que vamos utilizar ao longo do código
const html = document.querySelector('html');
const displayTempo  =   document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-button-icon');

//Variáveis de duração em milissegundos

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
//Play na Música a partir do checkbox;

musica.loop = true; // Defini que a música recomeça a tocar assim que acabar;
musicaFocoInput.addEventListener("change", ()=>{
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

//Altera o contexto do fundo e coloca a classe ativa no botão clicado;

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = duracaoFoco;
    alterarContexto('foco', 'foco.png');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = duracaoDescansoCurto;
    alterarContexto('descanso-curto', 'descanso-curto.png');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = duracaoDescansoLongo;
    alterarContexto('descanso-longo', 'descanso-longo.png');
    longoBt.classList.add('active');
})

//Função que altera o contexto dos botões clicados, tal como o fundo do site

function alterarContexto(contexto, imagem){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${imagem}`);
    switch(contexto){ 
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

// Contagem regressiva

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}
// Criando um evento de click para o botão iniciar ou pausar
startPauseBt.addEventListener('click', iniciarOuPausar);


// Função Iniciar ou pausar 
// Checa se o botão já está clickado.
// Caso não, inicia a contagem regressiva em segundos
// Modifica o texto do botão 
// Modifica o icone utilizado
// Caso o botão já esteja clicado, a função chama outra chamada zerar.
function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);   // Recebe o valor em milissegundos
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

// A função zerar tem como objetivo reiniciar os atributos do texto e da imagem do botão.
// como também pausar a contagem, resetando o intervaloId 

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

//Função mostrar tempo faz exatamente isso. Mostra o tempo na tela.
//Pega o valor em milissegundos e faz a alteração para o estilo pt-Br

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
//Ela é chamada no escopo global para que o mostrador esteja sempre presente na tela

mostrarTempo();