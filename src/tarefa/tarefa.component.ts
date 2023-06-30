import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';

interface Propriedade {
  nome: string;
  tipo: string;
  insercao: any;
}

interface Pessoa {
  tarefa: string;
  categoria: string;
  listaPropriedades: Propriedade[];
}

@Component({
  selector: 'tarefa-root',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  mostraInput: boolean = true;
  usuarios: Pessoa[] = [];
  tarefa: string;
  novaCategoria: string;
  tarefaSelecionada: Pessoa = null;
  categorias: string[] = [];
  tarefasFiltradas: Pessoa[] = [];
  tarefaDrop: Pessoa;
  categoriaDrop: string;
  indiceNovo: number;
  listaPropriedades: Propriedade[] = [];

  pessoa: Pessoa = {
    tarefa: '',
    categoria: '',
    listaPropriedades: []
  };

  user: Observable<user>;

  private userId: string = 'diogo.defante';
  users: Observable<user[]>;
  canAddTask: boolean;

  constructor(private userRepository: UserRepository) {
    this.users = this.userRepository.getUsers().pipe(
      tap(users => console.log(users))
    );
  
    this.user = this.getUsuarioLogado();
    console.log(this.user);
  
    this.hasPermission('Add').subscribe(canAdd => {
      this.canAddTask = canAdd;
    });
  }

  ngOnInit() {
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

    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) {
      this.usuarios = JSON.parse(usuariosSalvos);
    }

    const categoriasSalvas = localStorage.getItem('categorias');
    if (categoriasSalvas) {
      this.categorias = JSON.parse(categoriasSalvas);
    }

    const propriedadesSalvas = localStorage.getItem('listaPropriedades');
    if (propriedadesSalvas) {
      this.listaPropriedades = JSON.parse(propriedadesSalvas);
    }
  }

  cadastrarTarefa(): void {
    const propriedadesCadastro = this.listaPropriedades.map((propriedade) => ({
      ...propriedade,
      insercao: propriedade.insercao
    }));

    const usuario: Pessoa = {
      tarefa: this.pessoa.tarefa,
      categoria: this.pessoa.categoria,
      listaPropriedades: propriedadesCadastro
    };

    this.usuarios.push(usuario);
    this.limparForm();
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    for (let propriedade of this.listaPropriedades) {
      propriedade.insercao = '';
    }

    this.pessoa.tarefa = '';
    for (let propriedade of this.listaPropriedades) {
      propriedade.insercao = '';
    }
  }

  removerUsuario(usuario: Pessoa): void {
    const indice = this.usuarios.indexOf(usuario);
    this.usuarios.splice(indice, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  mostrarInput(): void {
    this.mostraInput = true;
  }

  limparForm(): void {
    this.pessoa.tarefa = '';
    this.pessoa.categoria = '';
  }

  atualizarTarefa(usuario: Pessoa, novaCategoria: string) {
    usuario.categoria = novaCategoria;
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  dragover(categoriaD: string, event: Event): void {
    event.preventDefault();
    this.categoriaDrop = categoriaD;
  }

  drag(tarefaD: Pessoa): void {
    this.tarefaDrop = tarefaD;
  }

  drop(event: Event): void {
    event.preventDefault();

    if (this.tarefaDrop) {
      this.tarefaDrop.categoria = this.categoriaDrop;
      this.ajustarPosicao();
    }
  }

  ajustarPosicao(): void {
    if (this.tarefaDrop) {
      this.usuarios.splice(this.usuarios.indexOf(this.tarefaDrop), 1);
      this.usuarios.splice(this.indiceNovo, 0, this.tarefaDrop);

      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  pegaIndice(indice: number, event: Event): void {
    event.preventDefault();
    this.indiceNovo = indice;
  }

  hasPermission(permission: string): Observable<boolean> {
    return this.user.pipe(
      map((user) => user && user.cardPermissions && user.cardPermissions.includes(permission))
    );
  }

  private getUsuarioLogado(): Observable<user> {
    return this.users.pipe(
      map((users) => users && users.find((user) => user.id === this.userId))
    );
  }
}


