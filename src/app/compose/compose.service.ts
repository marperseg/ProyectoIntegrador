import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { outMessage, newMsgeConfirm } from 'src/app/types';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComposeService {
  private URL: string = environment.serverUrl + '/compose';

  constructor(private http: HttpClient) {}

  //Post send new message
  sendMsge(newMsge: outMessage): Observable<newMsgeConfirm> {
    return this.http.post<newMsgeConfirm>(this.URL, newMsge, {
      withCredentials: true,
    });
  }
}
