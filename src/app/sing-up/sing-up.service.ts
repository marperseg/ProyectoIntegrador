import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser, UserCreated } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class SingUpService {
  private URL: string = environment.serverUrl + '/singUp';

  constructor(private http: HttpClient) {}

  // Put request to generate new user
  putUser(newUsr: NewUser): Observable<UserCreated> {
    console.log('service', newUsr);
    return this.http.put<UserCreated>(this.URL, newUsr, {
      withCredentials: true,
    });
  }
}
