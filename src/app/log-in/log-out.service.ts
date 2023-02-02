import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User, userLoggedIn } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  private URL: string = environment.serverUrl + '/logOut';

  constructor(private http: HttpClient) { }

  getLogOut(): Observable<void> {
    return this.http.get<void>(this.URL, {
      withCredentials: true,
    });
  }
}
