import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetInboxService } from '../get-inbox.service';
import { inMessage, userLoggedIn } from 'src/app/types';
import { CheckForLogInService } from 'src/app/check-for-log-in.service';
import { DeleteMsgeService } from 'src/app/delete-msge.service';
import { MarkAsReadService } from '../mark-as-read.service';
import { MsgToComponent } from 'src/app/compose/msg-to/msg-to.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  private getInboxSusbcriber!: Subscription;
  private isLoggedInSubsciber!: Subscription;
  private deleteMsgeSubscriber!: Subscription;
  private markAsReadSubscriber!: Subscription;

  public inboxMsgs: inMessage[] = [];
  public loggedUser = {} as userLoggedIn;
  public unread: number = 0;

  private subscribed_LI: boolean = false;
  private subscribed_GI: boolean = false;
  private subscribed_DM: boolean = false;
  private subscribed_MR: boolean = false;

  constructor(
    private getInboxService: GetInboxService,
    private checkForLogIn: CheckForLogInService,
    private deleteMsgeService: DeleteMsgeService,
    private markAsReadService: MarkAsReadService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubsciber = this.checkForLogIn.userIsLogged$.subscribe(
      (answer) => {
        // console.log('answer', answer);
        this.loggedUser.logged = answer;
        this.subscribed_LI = true;
        if (answer) {
          // console.log("Inbox get")
          this.getInboxSusbcriber = this.getInboxService
            .getInbox()
            .subscribe((data: inMessage[]) => {
              if (data) {
                this.inboxMsgs = data;
                this.unread = data.filter((msg) => msg.read == false).length;
                this.getInboxService.countUnread(this.unread);
                this.getInboxService.set_inboxMsgs(data);
                this.subscribed_GI = true;
              }
            });
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscribed_GI) this.getInboxSusbcriber.unsubscribe();
    if (this.subscribed_LI) this.isLoggedInSubsciber.unsubscribe();
    if (this.subscribed_DM) this.deleteMsgeSubscriber.unsubscribe();
    if (this.subscribed_MR) this.markAsReadSubscriber.unsubscribe();
  }

  inboxDelete(msgId: number, box: string) {
    this.deleteMsgeSubscriber = this.deleteMsgeService
      .deleteMsge(msgId, box)
      .subscribe((res: boolean) => {
        this.subscribed_DM = true;
        console.log(res);
        this.ngOnInit();
      });
  }

  markAsRead(msgId: number, mark: boolean) {
    // console.log('READ', msgId);
    this.markAsReadSubscriber = this.markAsReadService
      .markMsgeAsRead(msgId, mark)
      .subscribe((res: boolean) => {
        this.subscribed_MR = true;
        console.log(res);
      });
  }
}
