import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service'
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];


  selectedRecipe : Recipe;


  constructor(private recipeSerice:RecipeService) { }

  getRecipes():void{
    this.recipeSerice.getRecipes()
    .subscribe(recipes=>this.recipes=recipes);
  }
  ngOnInit() {
    this.getRecipes();
  }

  onSelect(recipe : Recipe):void{
    this.selectedRecipe = recipe;
  }
}
