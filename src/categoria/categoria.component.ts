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
    ngOnInit() {
      const categoriasSalvas = localStorage.getItem('categorias');
      if (categoriasSalvas) {
        this.categorias = JSON.parse(categoriasSalvas);
      }
    }
  
    adicionarCategoria(novaCategoria:string) {
        if (this.novaCategoria !== '') {
          this.categorias.push(this.novaCategoria);
          localStorage.setItem('categorias', JSON.stringify(this.categorias));
          this.novaCategoria = '';
        }
      }
      removerCategoria(categoria: string) {
        const index = this.categorias.indexOf(categoria);
        if (index !== -1) {
          this.categorias.splice(index, 1);
          localStorage.setItem('categorias', JSON.stringify(this.categorias));
        }
      }


}
