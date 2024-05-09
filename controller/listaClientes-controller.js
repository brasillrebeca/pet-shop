import { clienteService } from '../service/cliente-service.js'
// pegar os dados da API e colocar no HTML
const criaNovaLinha = (nome, email, id) => {
    // cria linhas para receber os nomes dos clientes
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `
      <td class="td" data-td>${nome}</td>
                  <td>${email}</td>
                  <td>
                      <ul class="tabela__botoes-controle">
                          <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                          <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                      </ul>
                  </td> 
                  `
    // colocar o conteúdo dentro (o template importado do HTML) e colocar dentro das linhas                
    linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id

    return linhaNovoCliente
}

// percorre a árvore do DOM através do data-atribute definido no HTML
const tabela = document.querySelector('[data-tabela]')

tabela.addEventListener('click', (evento) => {
    let ehBotaoDeDeleta = evento.target.className === 'botao-simples botao-simples--excluir'
    if (ehBotaoDeDeleta) {
        const linhaCliente = evento.target.closest('[data-id]')
        let id = linhaCliente.dataset.id
        clienteService.removeCliente(id)
            .then(() => {
                linhaCliente.remove()
            })

    }
})


clienteService.listaClientes()
    .then(data => {
        data.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
        })
    })