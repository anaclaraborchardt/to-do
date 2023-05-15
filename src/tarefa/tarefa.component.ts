import { Component } from '@angular/core';

interface Pessoa{

  tarefa: string;
  categoria: string
}

@Component({
  selector: 'tarefa-root',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
    mostraInput: boolean =true
    usuarios: Pessoa []=[]
    tarefa:string
    novaCategoria: string;
    tarefaSelecionada: Pessoa = null;
    categorias: string[] = [];
    tarefasFiltradas: Pessoa[] = [];
  
    pessoa: Pessoa = {
      tarefa:'',
      categoria:'',
    }
  
  cadastrarTarefa(): void {
    const usuario: Pessoa = {
      tarefa: this.pessoa.tarefa,
      categoria:this.pessoa.categoria
    };
    
  
    this.usuarios.push(usuario);
    this.limparForm();
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  
    this.pessoa = {
      tarefa:'',
      categoria:'',
    };
    this.filtrarTarefas(this.pessoa.categoria);
  }
  ngOnInit() {
    const usuario = localStorage.getItem('usuarios');
    if (usuario) {
      this.usuarios = JSON.parse(usuario);
    }
    const categoriasSalvas = localStorage.getItem('categorias');
    if (categoriasSalvas) {
      this.categorias = JSON.parse(categoriasSalvas);
    }
    this.filtrarTarefas('');
  }
  
  removerUsuario(usuario: Pessoa): void {
    const indice = this.usuarios.indexOf(usuario);
    this.usuarios.splice(indice, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
  
  mostrarInput(): void{
    this.mostraInput=true;
  }
  
  limparForm(): void{
    this.pessoa.tarefa = '';
    this.pessoa.categoria = '';
  
  }
  
  atualizarTarefa(usuario: Pessoa, novaCategoria: string) {
    usuario.categoria = novaCategoria;
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
  
  filtrarTarefas (categoria: string): void {
    if (categoria === '') {
      this.tarefasFiltradas = this.usuarios;
    } else {
      this.tarefasFiltradas = this.usuarios.filter(usuario => usuario.categoria === categoria);
    }
  }
    
}