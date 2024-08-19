//encontrar o botão adicionar tarefa
const btnAdcionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');


const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

let tarefas =JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

//Constante para limpar o formulário
const limparForm =  ()=>{
    textArea.value = '';  // Limpe o conteúdo do textarea
    formAddTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
}
//Função para atualizar tarefas
function atualizarTarefas (){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
//Criando um elemento tarefa
function criarElementoTarefa(tarefa){
//Criar li da tarefa
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
//Criar o estilo da tarefa
    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
//Criar o parágrafo
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description');
//Criar o botão
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
//Sobrescrever o evento onclick do botão para que edite a tarefa
    botao.onclick = ()=>{
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        if (novaDescricao){
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);
//Adicionar os elementos criados ao li
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = ()=>{
            document.querySelectorAll('.app__section-task-list-item-active') // Vai dar acesso a todos os items com essa classe.
                .forEach(elemento =>{
                    elemento.classList.remove('app__section-task-list-item-active'); //Para cada elemento com ela, ocorerrá a remoção da classe ativa
                });
            if(tarefaSelecionada === tarefa){                       //Se selecionarmos uma tarefa já selecionada, removemos a seleção e não fazemos mais nada.
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;  
            li.classList.add('app__section-task-list-item-active'); //, seguido pela adição da ativa no elemento clicado da vez.
        }
    }
//Identificando a tarefa ativa

    return li;
}

//receberá dois parametros no addEventListener: o que eu quero "Ouvir" e o que eu quero executar quando o evento acontecer;

btnAdcionarTarefa.addEventListener('click', ()=>{
    formAddTarefa.classList.toggle('hidden');
} )


formAddTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao:textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa =criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    limparForm();  
})

// Cancelar uma tarefa

btnCancelarTarefa.addEventListener('click', (evento)=>{
    evento.preventDefault();
    limparForm();
})


tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', ()=>{
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
});

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"; //seletor ternário de tarefas completas ou todas
    document.querySelectorAll(seletor).forEach(elemento =>{
        elemento.remove()
    });
    tarefas = somenteCompletas ? tarefas.filter(tarefa=> !tarefa.completa) : [];
    atualizarTarefas();
};

btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);

/*
// Carregando e exibindo tarefas do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa);
    });
});

*/