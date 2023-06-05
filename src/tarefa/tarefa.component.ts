import { Component } from '@angular/core';

interface Pessoa {
  tarefa: string;
  categoria: string;
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

  pessoa: Pessoa = {
    tarefa: '',
    categoria: '',
  };

  cadastrarTarefa(): void {
    const usuario: Pessoa = {
      tarefa: this.pessoa.tarefa,
      categoria: this.pessoa.categoria,
    };

    this.usuarios.push(usuario);
    this.limparForm();
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    this.pessoa = {
      tarefa: '',
      categoria: '',
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

  executaDrop(event: DragEvent, categoria: string): void {
    event.preventDefault();
  }

  drop(event: DragEvent, categoria: string): void {
    event.preventDefault();

    const tarefaArrastada = event.dataTransfer.getData('text/plain');
    const tarefa = this.usuarios.find((usuario) => usuario.tarefa === tarefaArrastada);
    if (tarefa) {
      tarefa.categoria = categoria;
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  TarefasCategoria(categoria: string): Pessoa[] {
    return this.usuarios.filter((usuario) => usuario.categoria === categoria);
  }

  transferirTarefa(event: DragEvent, usuario: Pessoa): void {
    event.dataTransfer.setData('text/plain', usuario.tarefa);
  }
}
