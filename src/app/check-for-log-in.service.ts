import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userLoggedIn } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckForLogInService {
  private URL: string = environment.serverUrl + '/chkUsrLogIn';

  private userIsLogged = new BehaviorSubject<boolean>(false);

  public userIsLogged$ = this.userIsLogged.asObservable();

  constructor(private http: HttpClient) {}

  public getCheckLI(): Observable<userLoggedIn> {
    return this.http.get<userLoggedIn>(this.URL, { withCredentials: true });
  }

  public set_userIsLogged(data: boolean) {
    // console.log("IsLoggedIn:  ",data)
    this.userIsLogged.next(data);
  }
}
