import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { markAsReadData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MarkAsReadService {
  private URL: string = environment.serverUrl + '/markAsRead';

  constructor(private http: HttpClient) {}

  // Post to mark message as read
  markMsgeAsRead(msgeId: number, mark: boolean): Observable<boolean> {
    console.log('msgeId', msgeId);
    let markData: markAsReadData = { msgId: msgeId, mark: mark };
    return this.http.post<boolean>(
      this.URL,
      markData,
      {
        withCredentials: true,
      }
    );
  }
}
