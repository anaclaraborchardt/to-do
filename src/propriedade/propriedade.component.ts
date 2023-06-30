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


}


