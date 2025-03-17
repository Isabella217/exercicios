
 function Servico(nome, descricao, custo) {
    this.nome = nome;
    this.descricao = descricao;
    this.custo = custo;

    this.tabela = function() {
        return `<br> Produto: ${this.nome} <br> Descrição: ${this.descricao} <br> Preço: R$ ${this.custo} <br><br>`;
    };
}

//////////ESCREVENDO NA PAGINA PRODUTOS CADASTRADOS
const servicos = [];
servicos.push(new Servico('Esterco Bovino', 'Adubo', '10.50'));
servicos.push(new Servico('Bokashi', 'Adubo', '9.59'));
servicos.push(new Servico('Kit ferramentas', 'Ferramentas', '30.30'));
servicos.push(new Servico('Regador', 'Regador 5 litros', '14.90'));


/////CUSTO DOS PRODUTOS
const custoProdutos = [10.50 , 9.59 , 30.30 , 14.90];
//////ESCREVE O TITULO SERVIÇOS
document.write("<br> Serviços <br>");

servicos.forEach(function(servico) {
    document.write(servico.tabela());
});



// CLASSE PRODUTO
class Produto {
    constructor(nomeProduto, nomeCliente,data) {
        this.nomeProduto = nomeProduto;
        this.nomeCliente = nomeCliente;
        this.data = data;
    }
}

// CLASSE LISTA DE PRODUTOS
class ListaDeProdutos {
    constructor() {
        this.arrayProdutos = [];
        
    }

    addProduto(produto){ 
        var i;

   
        for(i =0 ; i <=3; i++) {
        if (servicos[i].nome == produto.nomeProduto){
            alert("Produto: "+servicos[i].nome+"//////Custo: "+servicos[i].custo);
            localStorage.setItem(servicos[i].nome, servicos[i].custo);

            //VERIFICA SE O ITEM FOI ADICIONADO
            alert(localStorage.getItem(servicos[i].nome)); 
        }
    }
        this.arrayProdutos.push(produto);
    }

    removeProduto(index) {
        if (index >= 0 && index < this.arrayProdutos.length) {
            var produto = this.arrayProdutos[index];

            // Remove do localStorage
            for (var i = 0; i < servicos.length; i++) {
                if (servicos[i].nome === produto.nomeProduto) {
                    localStorage.removeItem(servicos[i].nome);
                    console.log("Item removido do localStorage:", servicos[i].nome);
                }
            }

            // Remove do array de produtos
            this.arrayProdutos.splice(index, 1);
        } else {
            console.log("Índice inválido para remover produto.");
        }
    }




    organizaListaProduto() {
        const lista = document.getElementById('Lista');
        lista.innerHTML = '';

        this.arrayProdutos.forEach((produto, index) => {
            const item = document.createElement('div');
            item.className = 'item-Produto';

            const nomeProduto = document.createElement('div');
            nomeProduto.textContent = `${produto.nomeProduto} - ${produto.nomeCliente} - ${produto.data}`;

            const verificaProduto = document.createElement('button');
            verificaProduto.textContent = 'verificar';
            verificaProduto.onclick = () => {
                
                var i;
                for(i =0 ; i <=3; i++) {
                if (servicos[i].nome == produto.nomeProduto){
                    alert("Produto: "+servicos[i].nome+"//////Custo: "+servicos[i].custo);
                }
            }

                
            };
//////////////ADICIONANDO AO CARRINHO
            const AddProdutoCarrinho = document.createElement('button');
            AddProdutoCarrinho.textContent = 'Adicionar ao carrinho';
            var total = 0;
            AddProdutoCarrinho.onclick = () => {
                 
                const custoProdutos = [10.50, 9.59, 30.30, 14.90];
                for (var i = 0; i < custoProdutos.length; i++) {
                    if(servicos[i].nome == produto.nomeProduto){
                    total += parseFloat(custoProdutos[i]);
                    localStorage.setItem(servicos[i].nome, total.toFixed(2));
                    alert(localStorage.getItem(servicos[i].nome));
                    }
                }


                alert("Total: " + total.toFixed(2));


            };
            ////////////////BOTAO LIMPAR TUDO DO LOCAL STORAGE
            const limpar = document.createElement('button');
            limpar.textContent = 'limpar tudo';
            limpar.onclick = () => {
                for (var i = 0; i <=this.arrayProdutos.length; i++) {
                    if (index >= 0 && index < this.arrayProdutos.length) {
                        var produto = this.arrayProdutos[index];
                                localStorage.clear(servicos[i].nome);
                        this.arrayProdutos.splice(index);
                    }
            }
                this.organizaListaProduto();
            }


///////////////REMOVER PRODUTO
            const removerProduto = document.createElement('button');
            removerProduto.textContent = 'Remover';
            removerProduto.onclick = () => {
                this.removeProduto(index);
                this.organizaListaProduto();
            };

            item.appendChild(nomeProduto);
            item.appendChild(removerProduto);
            item.appendChild(limpar)
            item.appendChild(verificaProduto);
            item.appendChild(AddProdutoCarrinho);
            lista.appendChild(item);
        });
    }
}

/////////////////MOSTRA ITENS QUE FORAM SALVOS NO STORAGE
function mostraItensSalvos(){
   
    const total = localStorage.length;
    for (var i=0; i<total; i++){
         // CHAVE ATUAL
         const chave = localStorage.key(i);

         // VALOR ASSOCIADO A CHAVE
         const valor = localStorage.getItem(chave);
         // MOSTRA CHAVE E VALOR
         alert(`Chave: ${chave}, Valor: ${valor}`);
    }
}

const listaProdutos = new ListaDeProdutos();


const adProdutos = document.getElementById('addprodutos');
adProdutos.addEventListener('click', adicionarProduto);

function adicionarProduto() {

    const nomeProduto = document.getElementById('nomeProduto').value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const data = document.getElementById('data').value;
    const novoProduto = new Produto(nomeProduto, nomeCliente,data);
    
    listaProdutos.addProduto(novoProduto);
    
    listaProdutos.organizaListaProduto();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PARTE 2 CLIENTES
class Cliente {
    constructor(nomeCliente, endereco, email, telefone) {
        this.nomeCliente = nomeCliente;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
    }
}

// CLASSE CLIENTE
class ListaDeClientes {
    constructor() {
        this.arrayClientes = [];
    }

    addCliente(cliente) {
        this.arrayClientes.push(cliente);
    }

    removeCliente(index) {
        this.arrayClientes.splice(index, 1);
    }
///////////ORGANZA LISTA CLIENTES
    organizaListaCliente() {

        const lista1 = document.getElementById('Lista1');
        
        lista1.innerHTML = '';

        this.arrayClientes.forEach((cliente, index) => {
            const item = document.createElement('div');
            item.className = 'item-Cliente';

            const nomeCliente = document.createElement('div');
            nomeCliente.textContent = `${cliente.nomeCliente}`;

            const removerCliente = document.createElement('button');
            removerCliente.textContent = 'Remover';
            removerCliente.onclick = () => {
                this.removeCliente(index);
                this.organizaListaCliente();
            };

            item.appendChild(nomeCliente);
            item.appendChild(removerCliente);

            lista1.appendChild(item);
        });
    }
}

const listaCliente = new ListaDeClientes();
///ADICIONAR CLIENTES
function adicionarCliente() {
    const nomeCliente = document.getElementById('nome').value;
    const enderecoCliente = document.getElementById('endereco').value;
    const emailCliente = document.getElementById('email').value;
    const telefoneCliente = document.getElementById('telefone').value;

    const novoCliente = new Cliente(nomeCliente, enderecoCliente, emailCliente, telefoneCliente);
    
    listaCliente.addCliente(novoCliente);

    listaCliente.organizaListaCliente();
}
