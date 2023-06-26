import { Component } from '@angular/core';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';


interface Pessoa {
  tarefa: string;
  categoria: string;
  listaPropriedades?:any;
}

@Component({
  selector: 'tarefa-root',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
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
  listaPropriedades: any []=[]

  pessoa: Pessoa = {
    tarefa: '',
    categoria: '',
    listaPropriedades:''
  };

  cadastrarTarefa(): void {
    const propriedadescadastro = this.listaPropriedades.map(propriedade => 
      ({ ...propriedade, insercao: propriedade.insercao }));
    const usuario: Pessoa = {
      tarefa: this.pessoa.tarefa,
      categoria: this.pessoa.categoria,
      listaPropriedades:propriedadescadastro
    };

    this.usuarios.push(usuario);
    this.limparForm();
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    for (let propriedade of this.listaPropriedades) {
      propriedade.insercao = '';
    }
    
    this.pessoa.tarefa='';
    for (let propriedade of this.listaPropriedades) {
      propriedade.insercao = ''; 
    }
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
    const propriedadesSalvas = localStorage.getItem('listaPropriedades');
    if (propriedadesSalvas) {
      this.listaPropriedades = JSON.parse(propriedadesSalvas);
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
    if (!this.hasPermission('Edit')) {
      return; 
    }
    this.tarefaDrop = tarefaD;
  }

  drop(event: Event): void {
    event.preventDefault();

    this.tarefaDrop.categoria = this.categoriaDrop;

    this.ajustarPosicao();
  }

  ajustarPosicao(): void {
    this.usuarios.splice(this.usuarios.indexOf(this.tarefaDrop), 1);
    this.usuarios.splice(this.indiceNovo, 0, this.tarefaDrop);

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  pegaIndice(indice: number, event: Event): void {
    event.preventDefault();
    this.indiceNovo = indice;
  }

  atualizarDrag(){
    if (!this.hasPermission('MoveCard')) {
      alert('Não pode cadastrar');
      return;
    }
    alert('Pode cadastrar');
  }

  user!: user


private userId: string = 'diogo.defante';
private users: user[] = []


constructor(private userRepository: UserRepository){
  this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();
    console.log(this.user);
}

adicionarTarefa(): void {
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


hasPermission(permission: string): boolean {
  return this.user.cardPermissions.some((cardPermission) => {
    return cardPermission === permission;
  });
}


private getUsuarioLogado(): user {
  return this.users.find((user) => {
    return user.id === this.userId
  }) as user;
}


}



