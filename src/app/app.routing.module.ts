import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriaComponent } from "src/categoria/categoria.component";
import { TarefaComponent } from "src/tarefa/tarefa.component";
import { PropriedadeComponent } from "src/propriedade/propriedade.component";
import { AuthGuardService } from "src/services/auth-guard.service";
import { ContaComponent } from "src/conta/conta.component";

const rotas: Routes=[
{path:'tarefas', component:TarefaComponent},
{path:'categorias', component:CategoriaComponent,  
//canActivate:[AuthGuardService]
},
{path:'propriedades', component:PropriedadeComponent},
{path:'conta', component:ContaComponent},
{path:'',redirectTo:'tarefas',pathMatch:'full'}

];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}