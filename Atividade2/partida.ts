var formPartida = document.getElementById('formPartida') as HTMLFormElement;
var tabelaPartida = document.getElementById('tbPartidas') as HTMLElement;
var selectCampeonato = document.getElementById("campeonato") as HTMLSelectElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");


interface Partida {
    id: number;
    timeMandante: string;
    timeVisitante: string;
    campeonatoId: number;
  }

interface Campeonato {
    id: number;
    nome: string;
}

  function carregarCampeonatos() {
    selectCampeonato.innerHTML = "<option value =''> Selecione o campeonato</option>"
    campeonatos.forEach((c : Campeonato) => {selectCampeonato.innerHTML += `<option value ="${c.id}">${c.nome}</option>`})
  }

  function atualizarTabelaPartida() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p : Partida) =>{
        var campeonato = campeonatos.find((c : Campeonato) => c.id == p.campeonatoId);
        var nomeCampeonato = campeonato ? campeonato.nome : "???";
        tabelaPartida.innerHTML += `
        <tr>
           <td>${p.timeMandante}</td>
           <td>${p.timeVisitante}</td>
           <td>${nomeCampeonato}</td>
           <td>
                <button onclick="editarPartida(${p.id})"> Editar </button> 
                <button onclick="removerPartida(${p.id})"> Remover </button> 
          </td>
        </tr>
    `;
    })
  }

  function removerPartida(id:number) {
    const partidaIndex =  partidas.findIndex((p:Partida) => p.id == id);
  
    if(partidaIndex !== -1){
      partidas.splice(partidaIndex, 1)
    }
    salvarLocalStoragePartida()
    atualizarTabelaPartida()
  }

  function editarPartida(id:number){
    const partida = partidas.find((p : Partida) => p.id ==id);

    if(!partida)  return;

    (document.getElementById("mandante") as HTMLInputElement).value = partida.timeMandante;
    (document.getElementById("visitante") as HTMLSelectElement).value = partida.timeVisitante;
    selectCampeonato.value = partida.campeonatoId.toString();
    
    const partidaIndex =  partidas.findIndex((p:Partida) => p.id == id);
  
    if(partidaIndex !== -1){
      partidas.splice(partidaIndex, 1)
    }
    salvarLocalStoragePartida()
    atualizarTabelaPartida()
  }

    function salvarLocalStoragePartida() {
        let partidasSalvar = JSON.stringify(partidas);
        localStorage.setItem("partidas", partidasSalvar);
    }

  function salvarPartida(event:Event) {
    event?.preventDefault();

    const campeonatoId = parseInt(selectCampeonato.value);
    if (!campeonatoId) {
        alert("selecione um campeonato!")
        return;
    }

    const novaPartida: Partida = {
      id: Date.now(),
      timeMandante: (document.getElementById("mandante") as HTMLSelectElement).value,
      timeVisitante: (document.getElementById("visitante") as HTMLInputElement).value,
      campeonatoId: campeonatoId,
    };

    partidas.push(novaPartida)
    atualizarTabelaPartida()
    salvarLocalStoragePartida()
    formPartida.reset()
    alert('Cadastrado de partida feito com sucesso!')
  }

  formPartida.addEventListener("submit", salvarPartida)
  carregarCampeonatos()
  atualizarTabelaPartida()