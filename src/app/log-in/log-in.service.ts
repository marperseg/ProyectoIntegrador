import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User, userLoggedIn } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  private URL: string = environment.serverUrl + '/logIn';

  constructor(private http: HttpClient) {}

  // getUser(): Observable<User[]> {
  //   return this.http.get<User[]>(this.URL);
  // }

  // getUser(): Observable<string> {
  //   return this.http.get(this.URL,
  //     {responseType: 'text'});
  // }

  postUser(usr: User): Observable<userLoggedIn> {
    return this.http.post<userLoggedIn>(this.URL, usr, {
      withCredentials: true,
    });
  }
}
