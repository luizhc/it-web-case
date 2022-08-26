import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { ExpenseDetailComponent } from './pages/expense/expense-detail/expense-detail.component';
import { ExpenseListComponent } from './pages/expense/expense-list/expense-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categorias', component: CategoryComponent },
  { path: 'lancamentos', component: ExpenseListComponent },
  { path: 'lancamentos/detalhe', component: ExpenseDetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
