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
import { TesteService } from 'src/services/teste.service';
import { CardsRepository } from 'src/repositories/cards.repository';
import { PropertiesRepository } from 'src/repositories/properties.repository';
import { PermissionsService } from 'src/services/permissions.service';



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
    AuthGuardService,
    TesteService,
    CardsRepository,
    PropertiesRepository,
    PermissionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
