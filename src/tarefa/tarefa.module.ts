import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TarefaComponent } from './tarefa.component';
import { CardsRepository } from 'src/repositories/cards.repository';
import { PropertiesRepository } from 'src/repositories/properties.repository';

@NgModule({
  declarations: [
    TarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CardsRepository,
  PropertiesRepository],
  bootstrap: [TarefaComponent]
})
export class AppModule { }