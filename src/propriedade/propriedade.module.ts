import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PropriedadeComponent } from './propriedade.component';

@NgModule({
  declarations: [
    PropriedadeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [PropriedadeComponent]
})
export class AppModule { }