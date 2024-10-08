const btnAbrirCarrinho = document.getElementById("cart-btn")
const menuLanche = document.getElementById('menu')
const modal = document.getElementById("modal")
const btnFecharModal = document.getElementById("btn-model-fechar")
const bntFinalizar = document.getElementById('bnt-finalizar')
const endereco = document.getElementById('endereco')
const enderecoErro = document.getElementById("endereco_erro");
const itensCarrinho = document.getElementById('cart-itens')
const totalValor = document.getElementById('cart-total')
const ContarItens = document.getElementById('cart-count')
const horario = document.getElementById("date-span")
const enderecoNumero = document.getElementById("endereco_numero")
const endereco_nome =  document.getElementById("endereco_nome")
const referencia = document.getElementById("endereco_referencia")
const btnDelivery = document.getElementById("btn-delivery")
const btnRetirada = document.getElementById("btn-retirada")
const infoDelivery = document.getElementById("info-delivery")
const infoRetirada = document.getElementById("info-retirada")
const endereco_whatsapp = document.getElementById('endereco_whatsapp')
const endereco_nomeRetirada = document.getElementById('endereco_nomeRetirada')
const btnDinheiro = document.getElementById("btn-dinheiro")
const btnTroco = document.getElementById("btn-troco")
const input_troco = document.getElementById('input_troco')
const btn_formasdePagamentos = document.getElementById('btn-formasdePagamentos');
const modal_Pagamento = document.getElementById('modal-pagamento');
const openModal = document.getElementById('btn-pag');
const btnFecharPagamentos = document.getElementById('btn-fechar-pagamentos')
const troco_input = document.getElementById('troco_input')
const btn_abrir_pagamentos = document.getElementById('btn_abrir_pagamentos')
const btn_confirmar_dinheiro = document.getElementById('btn_confirmar_dinheiro')
const valor_troco = document.getElementById('valor_troco')
const paymentButton = document.querySelectorAll('.payment-button')

let carrinho = []


// função para abrir meu modal
btnAbrirCarrinho.addEventListener("click", () =>{
    updateModal()
    modal.style.display = 'flex'
});


// função para fechar meu modal clicando no botão fechar
btnFecharModal.addEventListener('click', ()=>{
  modal.style.display = 'none'
});


// função para fechar meu modal clicando em qualquer lugar da tela
modal.addEventListener('click',function(evento){
if(evento.target === modal){
    modal.style.display = 'none'}})





menuLanche.addEventListener('click', function(evt) {
    let parentButton = evt.target.closest(".add-lanches-btn");
    if (parentButton) {
        const parentDiv = parentButton.closest(".flex.items-center");
        const dataName = parentDiv.getAttribute('data-name');
        const dataPrice = parseFloat(parentDiv.getAttribute('data-price'));
       addItemCarrinho(dataName,dataPrice)
    }
});




function addItemCarrinho(dataName,dataPrice){
    const verItemExistente = carrinho.find(item => item.dataName === dataName)

    if(verItemExistente){ // comeco do if
        // se item ja estiver no carrinho ele vai aumentar a quantidade
        verItemExistente.quantidade +=1;} // final do if

else {  // comeco do else

    carrinho.push({ // comeco do objeto
    dataName,
    dataPrice,
    quantidade:1,
}) // final do objeto
} // final do else
updateModal()

} // final da funcão








//função para aparecer os itens no modal




function updateModal() {
    itensCarrinho.innerHTML = "";
    let total = 0; // Total definido aqui

    const modalConteudo = document.createElement('div');
    modalConteudo.classList.add('modal-conteudo', 'max-h-60', 'overflow-y-auto');

    carrinho.forEach(item => {
        const cartElementoNovo = document.createElement('div');
        cartElementoNovo.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');
        cartElementoNovo.innerHTML = `
            <div class="flex items-center justify-between px-1 mt-0">
                <div>
                    <p class="font-bold">${item.dataName}</p>
                    <p class="font-medium">Quantidade: ${item.quantidade}</p>
                    <p class="font-semibold mt-1 mb-1">R$ ${item.dataPrice.toFixed(2)}</p>
                </div>
                <button class="py-1 px-1 border-none bg-red-600 text-white rounded-full justify-center items-center remove_btn" data-name="${item.dataName}">
                    <img src= './imagens_cardapio/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png'  class="w-8 h-8" >
                </button>
            </div>`;

        total += item.dataPrice * item.quantidade; // Acumula o total
        modalConteudo.appendChild(cartElementoNovo);
    });

    itensCarrinho.appendChild(modalConteudo); // Adiciona ao modal apenas uma vez

    // Atualizar a contagem de itens no carrinho
    ContarItens.innerHTML = carrinho.length;

    // Exibir total formatado
    totalValor.textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });


    // Adicionando evento de clique para remover item
    const removeButtons = document.querySelectorAll('.remove_btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.dataset.name;
            // Chame uma função para remover o item do carrinho
            removeItemFromCart(itemName);
        });
    });
}

function removeItemFromCart(itemName) {
    // Lógica para remover o item do carrinho
    carrinho = carrinho.filter(item => item.dataName !== itemName);
    updateModal(); // Atualiza o modal após remoção
}


// Função para remover dentro do carrinho
itensCarrinho.addEventListener('click', function(evt) {
    if (evt.target.classList.contains("remove_btn")) {
        const name = evt.target.getAttribute("data-name");
        removeItemCard(name); // Passa o nome do item para a função
    }
});

function removeItemCard(name) {
    const index = carrinho.findIndex(item => item.dataName === name);

    if (index !== -1) {
        const item = carrinho[index];

        if (item.quantidade > 1) {
            item.quantidade -= 1;
        } else {
            carrinho.splice(index, 1);
        }
        
        updateModal(); // Atualiza o modal após a remoção
    }
}


// Validação do nome do endereço
endereco_nome.addEventListener('input', function(evt) { 
    let inputName = evt.target.value;

    // Se o input não estiver vazio, remova a borda vermelha e esconda a mensagem de erro
    if (inputName !== "") {
        endereco_nome.classList.remove('border-red-500');
        enderecoErro.classList.add("hidden");
    } else {
        // Se o campo estiver vazio, mantenha a borda vermelha
        endereco_nome.classList.add('border-red-500');
        enderecoErro.classList.remove("hidden");
    }
});

// Validação do endereço
endereco.addEventListener('input', function(evento) {
    let inputValue = evento.target.value;

    // Se o input não estiver vazio, remova a borda vermelha e esconda a mensagem de erro
    if (inputValue !== "") {
        endereco.classList.remove('border-red-500');
        enderecoErro.classList.add("hidden");
    } else {
        // Se o campo estiver vazio, mantenha a borda vermelha
        endereco.classList.add('border-red-500');
        enderecoErro.classList.remove("hidden");
    }
});


enderecoNumero.addEventListener('input', function(evento){
    let inputNumero = evento.target.value;
        if(inputNumero !== ""){
            enderecoNumero.classList.remove("border-red-500");
                enderecoErro.classList.add("hidden");
    }
})




// Finalizando o pedido
bntFinalizar.addEventListener('click', () => {
    // Verifica se o restaurante está aberto
    const verificarAberto = horarioRestaurante();
    if (!verificarAberto) { 
        Toastify({
            text: "RESTAURANTE FECHADO",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return;
    }

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) return;
   
  // Se estiver em DELIVERY
  if (!infoDelivery.classList.contains('hidden')) {
    let valid = true;

    if (endereco_nome.value === "") {
        endereco_nome.classList.add('border-red-500');
        Toastify({ text: "PREENCHA O CAMPO DE NOME", duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "red" }}).showToast();
        valid = false;
        return;
    }
     else {
        endereco_nome.classList.remove('border-red-500');
    }

    if (endereco.value === "") {
        endereco.classList.add('border-red-500');
        Toastify({ text: "PREENCHA O CAMPO DE ENDEREÇO", duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "red" }}).showToast();
        valid = false;
        return;
    }  else {
        endereco.classList.remove('border-red-500');
    }

    


    if (enderecoNumero.value === "") {
        enderecoNumero.classList.add('border-red-500');
        Toastify({ text: "PREENCHA O CAMPO DE NUMERO", duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "red" }}).showToast();
        valid = false;
        return;
    } 
    else{
        enderecoNumero.classList.remove('border-red-500');
    }
   

    // Verifica outros campos de DELIVERY...

    if (valid) {
        Toastify({ text: "PEDIDO CONFIRMADO", duration: 1000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "#4CAF50" }}).showToast();

        // Enviar Via WhatsApp
      setTimeout(()=>{  const whatsapp = carrinho.map((item) => {
            return `PEDIDOS: ${item.dataName}\nQUANTIDADE: ${item.quantidade}\nPreço: R$ ${item.dataPrice}\n-------------------------------------------------\n`;
        }).join("");

        const msg = encodeURIComponent(`${whatsapp}\n NOME: ${endereco_nome.value}\n ENDEREÇO: ${endereco.value}\n NÚMERO: ${enderecoNumero.value}\n Forma de Pagamento: ${pagamentoMetodo} \nPONTO DE REFERÊNCIA: ${referencia.value}\nVALOR TOTAL: R$ ${totalValor.textContent}\n HORA PREVISTA DA ENTREGA : ${horaPrevista()}`);
        const phone = "+5511973245437";
        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
        carrinho.length = 0; // Limpa o carrinho
        updateModal(); // Atualiza o modal, se necessário
    },1000)
    }
}
// Se estiver em RETIRADA
if (!infoRetirada.classList.contains('hidden')) {
    let valid = true;
    

    if (endereco_nomeRetirada.value === "") {
        endereco_nomeRetirada.classList.add('border-red-500');
        Toastify({ text: "PREENCHA O CAMPO DE NOME", duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "red" }}).showToast();
        valid = false;
        return;
    } else {
        endereco_nomeRetirada.classList.remove('border-red-500');
    }

    if (endereco_whatsapp.value === "") {
        endereco_whatsapp.classList.add('border-red-500');
        Toastify({ text: "PREENCHA O CAMPO DE WHATSAPP", duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "red" }}).showToast();
        valid = false;
        return;
    } else {
        endereco_whatsapp.classList.remove('border-red-500');
    }

    if (valid) {
        Toastify({ text: "PEDIDO CONFIRMADO", duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "#4CAF50" }}).showToast();

        setTimeout(()=>{  const whatsapp = carrinho.map((item) => {
            return `PEDIDOS: ${item.dataName}\nQUANTIDADE: ${item.quantidade}\nPreço: R$ ${item.dataPrice}\n-------------------------------------------------\n`;
        }).join("");

         // Adiciona a forma de pagamento à mensagem
        const msg = encodeURIComponent(`${whatsapp}\nNOME: ${endereco_nomeRetirada.value}\nNÚMERO WHATSAPP: ${endereco_whatsapp.value}\nVALOR TOTAL: R$ ${totalValor.textContent}\n`);
        const phone = "+5511973245437";
        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
        carrinho.length = 0; // Limpa o carrinho
        updateModal(); // Atualiza o modal, se necessário
    },1000)

}}
});




    

                // FUNÇÃO HORARIO 
function horarioRestaurante(){
    const data = new Date();
        const hora = data.getHours();
            return hora >= 1 && hora < 24;  // verdadeiro se estiver aberto
}

                const horario_Aberto = horarioRestaurante();
                    if (horario_Aberto) {
                        horario.classList.remove('bg-red-600');
                            horario.classList.add('bg-green-600');
                                } else {
                            horario.classList.remove('bg-green-600');
                        horario.classList.add('bg-red-600');
                    }
                // FUNÇÃO CALCULAR TEMPO DE ENTREGA 

                function horaPrevista(){
            const obterHora = new Date();
        obterHora.setMinutes(obterHora.getMinutes() + 40); // adicionando 40 minutos de entrega
    const horaFormatada = `${String(obterHora.getHours()).padStart(2,'0')}:${String(obterHora.getMinutes()).padStart(2,'0')}`
return horaFormatada;
     }





// FUNÇÃO PRA ABRIR O BOTÃO DE HORARIO

                    const panel = document.getElementById('panel');
    const closeButton = document.getElementById('close-button');
    const dateSpan = document.getElementById('date-span');

    dateSpan.addEventListener('click', () => {
        panel.classList.toggle('-translate-y-full'); // Mostra o painel
        panel.classList.toggle('translate-y-1/5'); // Mover para baixo até a metade
    });

    closeButton.addEventListener('click', () => {
        panel.classList.add('-translate-y-full'); // Oculta o painel
        panel.classList.remove('translate-y-1/5'); // Reseta a posição
    });


// FUNÇÃO PRA ABRIR O BOTÃO DE DELIVERY

btnDelivery.addEventListener('click', function() {
    // Se o infoDelivery estiver escondido, mostre-o e esconda o infoRetirada
    if (infoDelivery.classList.contains('hidden')) {
        infoDelivery.classList.remove('hidden');
        infoRetirada.classList.add('hidden');
    } else {
        infoDelivery.classList.add('hidden');
    }
});

// FUNÇÃO PRA ABRIR O BOTÃO DE RETIRADA

btnRetirada.addEventListener('click', ()=> {
    if(infoRetirada.classList.contains('hidden')){
        infoRetirada.classList.remove('hidden')
        infoDelivery.classList.add('hidden')
    } else{
        infoRetirada.classList.add('hidden')
    }
})




// MODAL DE PAGAMENTOS
openModal.addEventListener('click',()=>{
    modal_Pagamento.style.display = 'flex'
})
// FECHAR MODAL DE PAGAMENTOS
btnFecharPagamentos.addEventListener('click', function(){
    modal_Pagamento.style.display = 'none'
})

// FECHAR MODAL DE PAGAMENTOS CLICANDO EM QUALQUER PARTE DA TELA

   modal_Pagamento.addEventListener('click', function(evento){
    if(evento.target === modal_Pagamento){
        modal_Pagamento.style.display = 'none'
    }
   })


      // Adicionando eventos de clique para os botões de pagamento
      let pagamentoMetodo = ''; // Variável global

      
      paymentButton.forEach(button => {
          button.addEventListener('click', function() {
              pagamentoMetodo = button.getAttribute('data-payment');

      
              // Mostrar ou esconder o input de troco
              if (pagamentoMetodo !== 'DINHEIRO') {
                  // Não fecha o modal aqui
                  Toastify({ text:`Forma de Pagamento ${pagamentoMetodo} !`, duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "green" }}).showToast();

                  modal_Pagamento.style.display = 'none'
                  document.getElementById('modal').style.display = 'flex'; // Mostra o modal principal

              } else {
                  troco_input.classList.toggle('hidden');
              }
          });
      
          paymentButton.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
      });
      
      

      btn_confirmar_dinheiro.addEventListener('click', function(){

        modal_Pagamento.style.display = 'none'
        document.getElementById('modal').style.display = 'flex'

        if(pagamentoMetodo === 'DINHEIRO'){
            Toastify({ text:`Forma de Pagamento Dinheiro !`, duration: 3000, close: true, gravity: "top", position: "right", stopOnFocus: true, style: { background: "green" }}).showToast();

        }

        
        
    })



