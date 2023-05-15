import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriaComponent } from "src/categoria/categoria.component";
import { TarefaComponent } from "src/tarefa/tarefa.component";

const rotas: Routes=[
{path:'tarefas', component:TarefaComponent},
{path:'categorias', component:CategoriaComponent},
{path:'',redirectTo:'tarefas',pathMatch:'full'}

];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}