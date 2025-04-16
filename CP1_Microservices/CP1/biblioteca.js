"use strict";
var formLivros = document.getElementById("formLivros");
var tabelaLivros = document.getElementById("tbLivros");
var livros = JSON.parse(localStorage.getItem("livros") || "[]");
function atualizarTabela() {
    tabelaLivros.innerHTML = "";
    livros.forEach((l) => {
        tabelaLivros.innerHTML += `
      <tr>
           <td>${l.titulo}</td>
           <td>${l.autor}</td>
           <td>${l.paginas}</td>
           <td>${l.genero}</td>
           <td>
      <button onclick="editarLivro(${l.id})"> Editar </button> 
          </td>
      </tr>
    `;
    });
}
function editarLivro(id) {
    //Find = buscar um elemento em um array
    const livro = livros.find((l) => l.id == id);
    if (!livro)
        return;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("paginas").value = livro.paginas;
    document.getElementById("genero").value = livro.genero;
    //findIndex buscar o index do objeto
    const campIndex = livros.findIndex((l) => l.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        livros.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function salvarLocalStorage() {
    let livrosSalvar = JSON.stringify(livros);
    localStorage.setItem("livros", livrosSalvar);
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoLivro = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        paginas: parseInt(document.getElementById("paginas").value),
        genero: document.getElementById("genero").value,
    };
    livros.push(novoLivro);
    atualizarTabela();
    salvarLocalStorage();
    formLivros.reset();
    alert('Cadastrado com sucesso!');
}
formLivros.addEventListener("submit", salvar);
atualizarTabela();
