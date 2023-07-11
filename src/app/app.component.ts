import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cards } from 'src/models/users/cards';
import { user } from 'src/models/users/user';
import { CardsRepository } from 'src/repositories/cards.repository';
import { PropertiesRepository } from 'src/repositories/properties.repository';
import { UserRepository } from 'src/repositories/user.respository';
import { TesteService } from 'src/services/teste.service';


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

constructor(private userRepository: UserRepository,
  private testeService: TesteService, 
   private cardRepository: CardsRepository,
  private propertyRepository: PropertiesRepository
) {
  userRepository.getUsers().subscribe({
    next: (value) =>{
      console.log(value)
    }
  });

  cardRepository.getCards().subscribe({
    next: (value) =>{
       console.log(value)
     }
   });

   propertyRepository.getProperties().subscribe({
     next: (value) =>{
       console.log(value)
     }
  });

  testeService.getTema().subscribe({
    next: (tema) => {
      console.log(tema);
    }
  })
}

private getUsuarioLogado(): Observable<user> {
  return this.users.pipe(
    map((users) => users && users.find((user) => user.meuParametro === this.userId))
  );
}
}





