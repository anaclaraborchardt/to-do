import { Component } from '@angular/core';


@Component({
  selector: 'categoria-root',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent {
    mostraCatInput: boolean = true;
    novaCategoria: string;
    categorias: string[] = [];
  
    adicionarCategoria(novaCategoria:string) {
        if (this.novaCategoria !== '') {
          this.categorias.push(this.novaCategoria);
          localStorage.setItem('categorias', JSON.stringify(this.categorias));
          this.novaCategoria = '';
        }
      }

      ngOnInit() {
        const categoriasSalvas = localStorage.getItem('categorias');
        if (categoriasSalvas) {
          this.categorias = JSON.parse(categoriasSalvas);
        }
      }

      removerCategoria(indice): void {
        this.categorias.splice(indice, 1)
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
      }
}