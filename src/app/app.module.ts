import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CategoriaComponent } from 'src/categoria/categoria.component';
import { TarefaComponent } from 'src/tarefa/tarefa.component';
import { AppRoutingModule } from './app.routing.module';
import { PropriedadeComponent } from 'src/propriedade/propriedade.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    TarefaComponent,
    PropriedadeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
