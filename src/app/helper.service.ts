import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private url = "https://demo.credy.in/api/v1/usermodule/login/";

  httpheader = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /**API to interact with backend */
  login(data: User) {
    return this.http.post<User>(this.url, data, this.httpheader)
      .pipe(
        catchError(this.handleError)
      )

  }

  private handleError(Error: HttpErrorResponse) {
    if (Error.error instanceof ErrorEvent) {
      // A client side or network error
      console.error('An Error occurred: ' + Error.error.message);
    } else {
      //Error from backEnd side
      console.error(`Error Generate from backEnd ${Error.status} the error is ${Error.error}`);
      console.log(Error);
    }
    return throwError('please try later not able to connect server...!');
  }
}
