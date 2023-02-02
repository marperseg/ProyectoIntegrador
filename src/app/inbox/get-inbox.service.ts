import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';

import { inMessage } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class GetInboxService {
  private URL: string =
    environment.serverUrl + '/getInbox';

  private inboxMessages = new Subject<inMessage[]>();
  public inboxMessages$ = this.inboxMessages.asObservable();

  private unread = new Subject<number>();
  public unread$ = this.unread.asObservable();
    
  constructor(private http: HttpClient) {}

  //Get request to get user inbox messages
  getInbox(): Observable<inMessage[]> {
    return this.http.get<inMessage[]>(this.URL, { withCredentials: true });
  }

  //Broadcast messages to filter
  public set_inboxMsgs(data: inMessage[]) {
    // console.log("set_inboxMsgs:  ",data)
    this.inboxMessages.next(data);
  }

    //Count and Broadcast unread msges to top-bar
    public countUnread(data: number) {
      // console.log("countUnread:  ",data)
      this.unread.next(data);
    }
}
