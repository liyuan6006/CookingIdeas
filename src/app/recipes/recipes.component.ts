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

  constructor(private recipeSerice:RecipeService) { }

  getRecipes():void{
    this.recipeSerice.getRecipes()
    .subscribe(recipes=>this.recipes=recipes);
  }
  ngOnInit() {
    this.getRecipes();
  }
addRecipe(name: string):void{
if(!name){
  return;
}
this.recipeSerice.addRecipe({name} as Recipe)
.subscribe(recipe=>this.recipes.push(recipe));
}

delete(recipe:Recipe) :void{
  this.recipes = this.recipes.filter(s=>s!=recipe);
this.recipeSerice.deleteRecipe(recipe).subscribe();
}
}
