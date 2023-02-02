import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';

import { outboxMessage } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class GetOutboxService {
  private URL: string =
    environment.serverUrl + '/getOutbox';

    
  private outboxMessages = new Subject<outboxMessage[]>();
  public outboxMessages$ = this.outboxMessages.asObservable();

  constructor(private http: HttpClient) {}

  //Get request to get user inbox messages
  getOutbox(): Observable<outboxMessage[]> {
    return this.http.get<outboxMessage[]>(this.URL, { withCredentials: true });
  }

  //Broadcast messages to filter
  public set_outboxMsgs(data: outboxMessage[]) {
    console.log("set_outboxMsgs:  ",data)
    this.outboxMessages.next(data);
  }
}
