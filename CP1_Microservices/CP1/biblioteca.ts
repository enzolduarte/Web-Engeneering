var formLivros = document.getElementById("formLivros") as HTMLFormElement;
var tabelaLivros = document.getElementById("tbLivros") as HTMLElement;
var livros = JSON.parse(localStorage.getItem("livros") || "[]");

interface Livro {
    id: number;
    titulo: string;
    autor: string;
    paginas: number;
    genero: string;
}

function atualizarTabela() {
    tabelaLivros.innerHTML = "";
    livros.forEach((l : Livro) =>{
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
    })
  }

  function editarLivro(id:number){
    const livro = livros.find(
      (l : Livro) => l.id ==id);
    
    if(!livro)  return;
  
    (document.getElementById("titulo") as HTMLInputElement).value = livro.titulo;
    (document.getElementById("autor") as HTMLSelectElement).value = livro.autor;
    (document.getElementById("paginas") as HTMLSelectElement).value = livro.paginas;
    (document.getElementById("genero") as HTMLInputElement).value = livro.genero;
    
    const campIndex =  livros.findIndex(
      (l: Livro) => l.id == id);
  
    if(campIndex !== -1){
      livros.splice(campIndex, 1)
    }
    salvarLocalStorage()
    atualizarTabela()
  }

  function salvarLocalStorage() {
    let livrosSalvar = JSON.stringify(livros);
    localStorage.setItem("livros", livrosSalvar);
  }

  function salvar(event:Event) {
    event?.preventDefault();
    const novoLivro: Livro = {
      id: Date.now(),
      titulo: (document.getElementById("titulo") as HTMLSelectElement).value,
      autor: (document.getElementById("autor") as HTMLInputElement).value,
      paginas:  parseInt((document.getElementById("paginas") as HTMLInputElement).value),
      genero: (document.getElementById("genero") as HTMLInputElement).value,
    };
    livros.push(novoLivro)
    atualizarTabela()
    salvarLocalStorage()
    formLivros.reset()
    alert('Cadastrado com sucesso!')
  }

  formLivros.addEventListener("submit", salvar)
  atualizarTabela()