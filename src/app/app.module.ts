import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CategoriaComponent } from 'src/categoria/categoria.component';
import { TarefaComponent } from 'src/tarefa/tarefa.component';
import { AppRoutingModule } from './app.routing.module';
import { PropriedadeComponent } from 'src/propriedade/propriedade.component';
import { UserRepository } from 'src/repositories/user.respository';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { ContaComponent } from 'src/conta/conta.component';
import { LoginComponent } from 'src/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    TarefaComponent,
    PropriedadeComponent,
    ContaComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserRepository,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
