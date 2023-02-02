import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { UserCreated } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class GetAddressService {
  private URL: string = environment.serverUrl + '/addresses/' ;

  constructor(private http: HttpClient) { }


  getAddresses(): Observable<UserCreated[]>{
    return this.http.get<UserCreated[]>(this.URL, { withCredentials: true });
  }

}
