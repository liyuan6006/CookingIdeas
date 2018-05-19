import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {path:'recipes', component:RecipesComponent},
  {path:'dashboard', component:DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'detail/:id', component:RecipeDetailComponent }
];

@NgModule({
  imports :[RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})


export class AppRoutingModule { }
