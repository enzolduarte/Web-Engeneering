var formTime = document.getElementById('formTime') as HTMLFormElement;
var tabelaTime = document.getElementById('tbTimes') as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");

interface Times {
    id: number;
    nome: string;
    abreviacao: string;
}

function atualizarTabelaTimes() {
    tabelaTime.innerHTML = "";
    times.forEach((t : Times) =>{
        tabelaTime.innerHTML += `
        <tr>
           <td>${t.nome}</td>
           <td>${t.abreviacao}</td>
           <td>
                <button onclick="editarTimes(${t.id})"> Editar </button> 
                <button onclick="removerTimes(${t.id})"> Remover </button> 
          </td>
        </tr>
    `;
    })
}

function removerTimes(id:number) {
    const timesIndex =  times.findIndex((t:Times) => t.id == id);
  
    if(timesIndex !== -1){
      times.splice(timesIndex, 1)
    }
    salvarLocalStorageTimes()
    atualizarTabelaTimes()
  }

  function editarTimes(id:number){
    const time = times.find((t : Times) => t.id ==id);

    if(!time)  return;

    (document.getElementById("nome") as HTMLInputElement).value = time.nome;
    (document.getElementById("abreviacao") as HTMLSelectElement).value = time.abreviacao;
    
    const timesIndex =  times.findIndex((t:Times) => t.id == id);
  
    if(timesIndex !== -1){
      times.splice(timesIndex, 1)
    }
    salvarLocalStorageTimes()
    atualizarTabelaTimes()
  }

  function salvarLocalStorageTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}

function salvarTime(event:Event) {
    event?.preventDefault();

    const novoTime: Times = {
      id: Date.now(),
      nome: (document.getElementById("nome") as HTMLSelectElement).value,
      abreviacao: (document.getElementById("abreviacao") as HTMLInputElement).value.toUpperCase(),
    };

    times.push(novoTime)
    atualizarTabelaTimes()
    salvarLocalStorageTimes()
    formTime.reset()
    alert('Cadastrado de time feito com sucesso!')
  }

  formTime.addEventListener("submit", salvarTime)
  atualizarTabelaTimes()