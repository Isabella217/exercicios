class Tarefa {
    constructor(titulo, dDate) {
        this.titulo = titulo;
        this.dDate = dDate;
        this.completada = false; 
    }
    MudaStatus() {
        this.completada = !this.completada;
    }
}

class ListaDeTarefas {
    constructor() {
        this.Arraytarefas = [];
    }

    addTarefa(tarefa) {
        this.Arraytarefas.push(tarefa);
    }

    removeTarefa(tarefa) {
        this.Arraytarefas = this.Arraytarefas.filter(t => t !== tarefa);
    }

    MudaTarefaCompletada(tarefa) {
        const tarefaAMudar = this.Arraytarefas.find(t => t === tarefa);
        tarefaAMudar.MudaStatus();
    }
}
//Instanciando a lista de tarefas
const listaTarefas = new ListaDeTarefas();

//funções para interagir com o DOM
function adicionarTarefa() {
    const title = document.getElementById('tarefaTitle').value;
    const date = document.getElementById('tarefaDate').value;
    const novaTarefa = new Tarefa(title, date);
    listaTarefas.addTarefa(novaTarefa);
    organizaTarefas();
}

function removerTarefa(indice) {
    //Splice sendo usado para remover um elemento do array
    //indice indica a posição do elemento e 1 indica quantos elementos devem ser removidos
    listaTarefas.Arraytarefas.splice(indice, 1);
    organizaTarefas();
}

function organizaTarefas() {
    //pega a segunda div e zera
    const LTarefas = document.getElementById('LTarefas');
    LTarefas.innerHTML = '';
    
    //percorre a lista de tarefas e cria a div com os itens abaixo
    listaTarefas.Arraytarefas.forEach((tarefa, indice) => {
        
        //cria a div com o nome da classe: item-tarefa
        const tarefaItem = document.createElement('div');
        tarefaItem.className = 'item-tarefa';
        
        //cria na div os dois valores dos atributos titulo e data
        const tarefaInfo = document.createElement('div');
        tarefaInfo.textContent = `${tarefa.titulo} - ${tarefa.dDate}`;

        //cria um botão com o nome Remover na face e com a função onclick para executar o método removerTarefa(indice)
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerTarefa(indice);

        //função appendChild anexa os elementos gerados
        tarefaItem.appendChild(tarefaInfo); //anexando titulo e data
        tarefaItem.appendChild(botaoRemover); //anexando o botao remover
        LTarefas.appendChild(tarefaItem); //anexa todos os itens na div 
    });
}