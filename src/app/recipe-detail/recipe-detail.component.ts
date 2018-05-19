import { Component, OnInit, Input} from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

recipe : Recipe;
  constructor(
    private route :ActivatedRoute,
    private recipeService : RecipeService,
    private location : Location
  ) { }

  getRecipeById():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(id)
    .subscribe(recipe =>this.recipe=recipe);
  }
  ngOnInit() {
    this.getRecipeById();
  }

  goBack(): void{
    this.location.back();
  }

}
