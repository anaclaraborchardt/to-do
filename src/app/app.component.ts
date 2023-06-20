import { Component } from '@angular/core';
import { users } from 'src/data/users';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';

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
  mostraCatInput: boolean = true;
  usuarios: Pessoa []=[]
  tarefa:string
  novaCategoria: string;
  tarefaSelecionada: Pessoa = null;
  categorias: string[] = [];

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
  const categoriasSalvas = localStorage.getItem('categorias');
  if (categoriasSalvas) {
    this.categorias = JSON.parse(categoriasSalvas);
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

adicionarCategoria(novaCategoria:string) {
  if (this.novaCategoria !== '') {
    this.categorias.push(this.novaCategoria);
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
    this.novaCategoria = '';
  }
}

private userId: string = 'joao.silva';
private users: user[] = []

constructor(private userRepository: UserRepository){
  this.users = this.userRepository.getUsers()
  
  console.log(this.getUsuarioLogado())
}

private getUsuarioLogado(): user | undefined{
return this.users.find ((user) => {
  return user.id === this.userId
} )
}

//adicionarTarefa(): void{
 // if(!this.getUsuarioLogado()?.cardPermissions.some((permission)=>{
 //   return permission === 'Add'
//  })){
 //  console.log("não pode cadastrar")
 // }
//}
 
}

