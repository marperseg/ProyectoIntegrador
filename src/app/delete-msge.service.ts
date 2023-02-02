import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { deleteData } from './types';

@Injectable({
  providedIn: 'root',
})
export class DeleteMsgeService {
  private URL: string = environment.serverUrl + '/deleteMsge';

  constructor(private http: HttpClient) {}

  // Post to delete msge
  deleteMsge(msgeId: number, msgeBox: string): Observable<boolean> {
    console.log('msgeId', msgeId);
    let delData: deleteData = { id: msgeId, box: msgeBox };
    return this.http.post<boolean>(this.URL, delData, {
      withCredentials: true,
    });
  }
}
