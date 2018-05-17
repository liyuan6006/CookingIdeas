import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
import {RECIPES} from './mock-recipes';
import {of,Observable} from 'rxjs';
import {MessageService} from './message.service'
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private messageService:MessageService) { }

  getRecipes(): Observable<Recipe[]>{

    this.messageService.add('RecipeService: fetched recipes')
    return of(RECIPES);
  }
}
