import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastosComponent } from './gastos/gastos.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TasksComponent } from './tasks/tasks.component';
  
const routes: Routes = [
  { path: 'gastos', component: GastosComponent },
  { path: 'ingresos', component: IngresosComponent },
  { path: 'total', component: StatisticsComponent },
  { path: 'tareas', component: TasksComponent },
  {path:'login',component:LoginComponent}


 
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }