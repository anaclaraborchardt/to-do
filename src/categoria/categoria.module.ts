import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoriaComponent } from './categoria.component';

@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [CategoriaComponent]
})
export class CategoriaModule { }