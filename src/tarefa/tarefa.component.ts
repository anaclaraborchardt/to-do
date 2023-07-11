import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { cards } from 'src/models/users/cards';
import { properties } from 'src/models/users/properties';
import { user } from 'src/models/users/user';
import { CardsRepository } from 'src/repositories/cards.repository';
import { PropertiesRepository } from 'src/repositories/properties.repository';
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
  usuario: user[];
  private listaPropertyPermission: properties[];
  listaCardPermission: cards[];

  constructor(private userRepository: UserRepository,
    private cardRepository: CardsRepository,
    private propertyRepository: PropertiesRepository,
    private httpClient: HttpClient
    ) {
      userRepository.getUsers().subscribe({
        next: (value) => {
          this.usuario = value;
        }
      });
      
      propertyRepository.getProperties().subscribe({
        next: (valor) => {
          this.listaPropertyPermission = valor;
        }
      });

      cardRepository.getCards().subscribe({
        next: (valor) => {
          this.listaCardPermission = valor;
        }
      });
  }

  ngOnInit() {
    this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();

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

    this.userId = localStorage.getItem('meuParametro');
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

  hasPermission(permission: string): boolean {
    for(let cardPermissions of this.listaCardPermission){
      for(let usuario of this.usuario){
      if(cardPermissions.id_usuario === this.userId
        && cardPermissions.permissions === permission){
        return true
      }
    }
  }
  }

  private getUsuarioLogado(): Observable<user> {
    return this.users.pipe(
      map((users) => users && users.find((user) => user.meuParametro === this.userId))
    );
  }
}


