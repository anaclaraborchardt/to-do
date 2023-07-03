import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  cookieValue='unknown'

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
  this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();

    this.user.subscribe((loggedInUser) => {
      if (loggedInUser) {
        this.hasPermission('Add').subscribe((canAdd) => {
          if (canAdd) {
            console.log('Pode cadastrar');
          } else {
            console.log('Não pode cadastrar');
          }
        });

        this.hasPermission('Edit').subscribe((canEdit) => {
          if (canEdit) {
            console.log('Pode editar');
          } else {
            console.log('Não pode editar');
          }
        });

        this.hasPermission('Remove').subscribe((canRemove) => {
          if (canRemove) {
            console.log('Pode remover');
          } else {
            console.log('Não pode remover');
          }
        });
      }
    });
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

user: Observable<user>;

private userId: string = 'diogo.defante';
users: Observable<user[]>;

constructor(private userRepository: UserRepository) {}

adicionarTarefa(): void {
  if (!this.hasPermission('Add')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}

adicionarPropriedade(): void {
  if (!this.hasPermission('Add')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}


editarTarefa(): void {
  if (!this.hasPermission('Edit')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}


removerTarefa(): void {
  if (!this.hasPermission('Remove')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}


hasPermission(permission: string): Observable<boolean> {
  return this.user.pipe(
    map((user) => user && user.cardPermissions && user.cardPermissions.includes(permission))
  );
}

private getUsuarioLogado(): Observable<user> {
  return this.users.pipe(
    map((users) => users && users.find((user) => user.meuParametro === this.userId))
  );
}


}





