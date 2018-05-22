import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
import {RECIPES} from './mock-recipes';
import {of,Observable} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
private recipeUrl = 'http://localhost:56060/api/recipes';

  constructor(
    private http :HttpClient,
    private messageService:MessageService) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipeUrl)
    .pipe(
      tap(recipes=>this.log('fetched recipes')),
      catchError(this.handleError('getRecipes', []))
    );
  }

  addRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post<Recipe>(this.recipeUrl,recipe).pipe(
      tap((recipe:Recipe)=>this.log('added recipe with id =${recipe.id}')),
    catchError(this.handleError<Recipe>('addRecipe'))
  );
}

  getRecipeById(id:number): Observable<Recipe>{
    const url = `${this.recipeUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap((recipe:Recipe)=>this.log('fetched recipe with id =${recipe.id}')),
    catchError(this.handleError<Recipe>('addRecipe')));
  }

  private log(message:string){
    this.messageService.add('RecipeService ' + message)
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
