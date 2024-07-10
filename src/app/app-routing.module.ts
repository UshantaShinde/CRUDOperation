import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { DetailViewComponent } from './pages/detail-view/detail-view.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'list-view', component: ListViewComponent },
  { path: 'detail-view', component: DetailViewComponent },
  { path: 'add-task/:id1', component: AddTaskComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
