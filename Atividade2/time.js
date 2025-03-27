"use strict";
var formTime = document.getElementById('formTime');
var tabelaTime = document.getElementById('tbTimes');
var times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTabelaTimes() {
    tabelaTime.innerHTML = "";
    times.forEach((t) => {
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
    });
}
function removerTimes(id) {
    const timesIndex = times.findIndex((t) => t.id == id);
    if (timesIndex !== -1) {
        times.splice(timesIndex, 1);
    }
    salvarLocalStorageTimes();
    atualizarTabelaTimes();
}
function editarTimes(id) {
    const time = times.find((t) => t.id == id);
    if (!time)
        return;
    document.getElementById("nome").value = time.nome;
    document.getElementById("abreviacao").value = time.abreviacao;
    const timesIndex = times.findIndex((t) => t.id == id);
    if (timesIndex !== -1) {
        times.splice(timesIndex, 1);
    }
    salvarLocalStorageTimes();
    atualizarTabelaTimes();
}
function salvarLocalStorageTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}
function salvarTime(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const novoTime = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        abreviacao: document.getElementById("abreviacao").value.toUpperCase(),
    };
    times.push(novoTime);
    atualizarTabelaTimes();
    salvarLocalStorageTimes();
    formTime.reset();
    alert('Cadastrado de time feito com sucesso!');
}
formTime.addEventListener("submit", salvarTime);
atualizarTabelaTimes();
