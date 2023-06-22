import { Component } from '@angular/core';
import { user } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.respository';

interface Propriedade {
  nome: string;
  tipo: string | number | undefined;
  itensSelecao?: string[];
  insercao: string | number | undefined;
  valor?: string | number;
}

@Component({
  selector: 'tarefa-root',
  templateUrl: './propriedade.component.html',
  styleUrls: ['./propriedade.component.css']
})
export class PropriedadeComponent {
  mostraInput: boolean = true;
  mostraPropInput: boolean = true;
  novaPropriedade: string;
  itensSelecao: string;
  listaPropriedades: Propriedade[] = [];
  novaOpcao: string;
  mostraEditarOpcao: boolean = false;

  propriedade: Propriedade = {
    nome: '',
    tipo: '',
    itensSelecao: [],
    insercao:''
  };

  cadastrarPropriedades(): void {
    const prop: Propriedade = {
      nome: this.novaPropriedade,
      tipo: this.propriedade.tipo,
      itensSelecao: this.propriedade.tipo === 'selecao' ? [String(this.propriedade.insercao)] : [],
      insercao:this.propriedade.insercao
    };

    this.listaPropriedades.push(prop);
    this.limparForm();
    localStorage.setItem('listaPropriedades', JSON.stringify(this.listaPropriedades));
  }

  limparForm(): void {
    this.novaPropriedade = '';
    this.propriedade.tipo = '';
    this.itensSelecao = '';
  }

  ngOnInit() {
    const prop = localStorage.getItem('listaPropriedades');
    if (prop) {
      this.listaPropriedades = JSON.parse(prop);
    }
  }

  removerUsuario(prop: Propriedade): void {
    const indice = this.listaPropriedades.indexOf(prop);
    this.listaPropriedades.splice(indice, 1);
    localStorage.setItem('listaPropriedades', JSON.stringify(this.listaPropriedades));
  }
  adicionarOpcao(): void {
    if (this.novaOpcao) {
      this.propriedade.itensSelecao.push(this.novaOpcao);
      this.novaOpcao = '';
    }
  }
  editarSelecao(): void {
    this.mostraEditarOpcao = true;
  }

  user!: user


private userId: string = 'joao.silva';
private users: user[] = []


constructor(private userRepository: UserRepository){
  this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();
    console.log(this.user);
}

adicionarPropriedade(): void {
  if (!this.hasPermission2('Add')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}


editarPropriedade(): void {
  if (!this.hasPermission2('Edit')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}

removerPropriedade(): void {
  if (!this.hasPermission2('Remove')) {
    alert('Não pode cadastrar');
    return;
  }
  alert('Pode cadastrar');
}

hasPermission2(permission2: string): boolean {
  return this.user.propertiesPermissions.some((propertiesPermission) => {
    return propertiesPermission === permission2;
  });
}


private getUsuarioLogado(): user {
  return this.users.find((user) => {
    return user.id === this.userId
  }) as user;
}


}


