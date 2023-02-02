import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetOutboxService } from '../get-outbox.service';
import { CheckForLogInService } from 'src/app/check-for-log-in.service';
import { DeleteMsgeService } from 'src/app/delete-msge.service';

import { outboxMessage, userLoggedIn } from 'src/app/types';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css'],
})
export class OutboxComponent implements OnInit {
  private getOutboxSusbcriber!: Subscription;
  private isLoggedInSubsciber!: Subscription;
  private deleteMsgeSubscriber!: Subscription;
  public outboxMsgs: outboxMessage[] = [];
  public loggedUser = {} as userLoggedIn;

  private subscribed_GO: boolean = false;
  private subscribed_LI: boolean = false;
  private subscribed_DM: boolean = false;

  constructor(
    private getOutboxService: GetOutboxService,
    private checkForLogIn: CheckForLogInService,
    private deleteMsgeService: DeleteMsgeService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubsciber = this.checkForLogIn.userIsLogged$.subscribe(
      (answer) => {
        // console.log('answer', answer);
        this.loggedUser.logged = answer;
        this.subscribed_LI = true;
        if (answer) {
          this.getOutboxSusbcriber = this.getOutboxService
            .getOutbox()
            .subscribe((data: outboxMessage[]) => {
              this.subscribed_GO = true;
              if (data) {
                this.outboxMsgs = data;
                this.getOutboxService.set_outboxMsgs(data);
              }
            });
        }
      }
    );
  }

  outboxDelete(msgId: number, box: string) {
    this.deleteMsgeSubscriber = this.deleteMsgeService
    .deleteMsge(msgId, box)
    .subscribe((res: boolean) => {
      this.subscribed_DM = true;
      console.log(res);
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    if (this.subscribed_GO) this.getOutboxSusbcriber.unsubscribe();
    if (this.subscribed_LI) this.isLoggedInSubsciber.unsubscribe();
    if (this.subscribed_DM) this.deleteMsgeSubscriber.unsubscribe();
  }
}
