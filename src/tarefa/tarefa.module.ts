import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TarefaComponent } from './tarefa.component';

@NgModule({
  declarations: [
    TarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [TarefaComponent]
})
export class AppModule { }