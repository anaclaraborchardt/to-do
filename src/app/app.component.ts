import { Component } from '@angular/core';

interface Pessoa{

  tarefa: string;
  categoria: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  
  mostraInput: boolean =true
  usuarios: Pessoa []=[]
  tarefa:string
  novaCategoria: string;
  tarefaSelecionada: Pessoa = null;

  pessoa: Pessoa = {
    tarefa:'',
    categoria:'',
  }

cadastrarusuario(): void {
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
}
ngOnInit() {
  const usuario = localStorage.getItem('usuarios');
  if (usuario) {
    this.usuarios = JSON.parse(usuario);
  }
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

atualizarTarefa(usuario: Pessoa) {
  localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
}
   
}
