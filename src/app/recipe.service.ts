import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
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
      tap(recipes=>this.log(`fetched recipes`)),
      catchError(this.handleError('getRecipes', []))
    );
  }

  addRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post<Recipe>(this.recipeUrl,recipe).pipe(
      tap((recipe:Recipe)=>this.log(`added recipe with id =${recipe.id}`)),
    catchError(this.handleError<Recipe>('addRecipe'))
  );
}

updateRecipe(recipe:Recipe):Observable<any>{
  return this.http.put<any>(this.recipeUrl,recipe).pipe(
    tap(_=>this.log(`updated recipe with =${recipe}`),
    catchError(this.handleError<any>('updateRecipe'))
  )
  )
}

  getRecipeById(id:number): Observable<Recipe>{
    const url = `${this.recipeUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap((recipe:Recipe)=>this.log(`fetched recipe with id =${recipe.id}`)),
    catchError(this.handleError<Recipe>('addRecipe')));
  }

  deleteRecipe(recipe:Recipe):Observable<Recipe>{
 const id = recipe.id;
 const url = `${this.recipeUrl}/${id}`;
 return this.http.delete<Recipe>(url).pipe(
   tap(_=>this.log(`deleted recipe with id ${id}`)),
   catchError(this.handleError('deleteRecipe')));
  }

  searchRecipe(term:string):Observable<Recipe[]>{
if(!term.trim()){
  return of([]);
}
return this.http.get<Recipe[]>(`${this.recipeUrl}/?name=${term}`).pipe(
  tap(_=>this.log(`found recipes matching "${term}"`)),
  catchError(this.handleError<Recipe[]>('searchRecipes',[])
)
)
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
