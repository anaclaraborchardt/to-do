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
  

  pessoa: Pessoa = {
    tarefa:'',
    categoria:''
  }

inputMudou(event):void{
  console.log(event)
}

mostrarInput(): void{
  this.mostraInput=true;
}

esconderInput(): void{
  this.mostraInput=false;

}
cadastrarusuario(): void {
  const usuario: Pessoa = {
    tarefa: this.pessoa.tarefa,
    categoria: this.pessoa.categoria
  }

  this.usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  this.tarefa = '';
}

removerUsuario():void{
localStorage.removeItem('usuario');
}
   
}
