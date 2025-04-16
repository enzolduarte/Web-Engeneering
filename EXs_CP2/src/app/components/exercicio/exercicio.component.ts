import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-exercicio',
  imports: [CommonModule],
  templateUrl: './exercicio.component.html',
  styleUrl: './exercicio.component.css'
})
export class ExercicioComponent {
  mes: number = 1;
  itens: string = "Maçã";
  listaCompras = ["Maçã", "Banana", "Leite"];
  idade: number = 0;
  tarefa: string = "Estudar Angular";
  listaTarefas = ["Estudar Angular", "Fazer Exercícios", "Revisar Código"];
  status: string = "pendente";
  //usuario: {nome:string, idade: number} = {nome: "Ana", idade: 25};
  // Utilizando usuario para que o Angular pudesse inferir o tipo de dado estava dando erro Property 'nome' does not exist on type 'never'. e Property 'idade' does not exist on type 'never'.
  usuarios: {nome:string, idade: number} [] = [{nome: "Ana", idade: 25},{nome: "Carlos", idade: 30}];
  valor: number|string = 0;
  email: string = "";
  senha: string = "";
  produtos: {nome:string, preco:number, promocao:boolean} [] = [{nome: "Notebook", preco: 3000, promocao: true}, {nome: "Mouse", preco: 50, promocao: false}];
  valor1: number = 0;
  valor2: number = 0;
  operacao: string = "soma";

  trocarMes(event:Event) {
    const mesSelecionado = (event.target as HTMLSelectElement).value;
    this.mes = parseInt(mesSelecionado);
  }

  aumentarIdade(event:Event) {
    this.idade++;
  }

  diminuirIdade(event:Event) {
    this.idade--;
  }

  verificaIdade(event:Event) {
    const idadeSelecionada = (event.target as HTMLInputElement).value;
    this.idade = parseInt(idadeSelecionada);
  }

  removerTarefa(index:number) {
    this.listaTarefas.splice(index, 1);
  }

  atualizarStatus(event:Event) {
    const statusSelecionado = (event.target as HTMLSelectElement).value;
    this.status = statusSelecionado;

  }

  trocarValor(event:Event) {
    const valorSelecionado = (event.target as HTMLInputElement).value;
    
    if (valorSelecionado === "1") {
      this.valor = 1;
    }
    else if (valorSelecionado === "dois") {
      this.valor = "dois";
    } else {
      this.valor = valorSelecionado;
    }
  }

  inserirEmail(event:Event) {
    const emailSelecionado = (event.target as HTMLInputElement).value;
    this.email = emailSelecionado;
  }

  inserirSenha(event:Event) {
    const senhaSelecionada = (event.target as HTMLInputElement).value;
    this.senha = senhaSelecionada;
  }

  get loginInvalido(): boolean {
    return !this.email.includes('@') || this.senha.length < 6;
  }

  receberValor1(event:Event) {
    const valorSelecionado = (event.target as HTMLInputElement).value;
    this.valor1 = parseInt(valorSelecionado);
  }

  receberValor2(event:Event) {
    const valorSelecionado = (event.target as HTMLInputElement).value;
    this.valor2 = parseInt(valorSelecionado);
  }

  atualizarOperacao(event:Event) {
    const operacaoSelecionada = (event.target as HTMLSelectElement).value;
    this.operacao = operacaoSelecionada;
  }
}
