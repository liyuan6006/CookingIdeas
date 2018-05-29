import { Component, OnInit } from '@angular/core';
import {observable, Subject, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged,switchMap} from 'rxjs/operators' ;
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
recipes$ : Observable<Recipe[]>;
private searchTerms = new Subject<string>();

  constructor(private recipeService : RecipeService) { }

  search(term:string):void{
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.recipes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.recipeService.searchRecipe(term))
    );
  }

}
