import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FilterMsgesService } from '../filter-msges.service';
import { CheckForLogInService } from 'src/app/check-for-log-in.service';
import { inMessage, userLoggedIn, outboxMessage } from 'src/app/types';
import { GetInboxService } from 'src/app/inbox/get-inbox.service';
import { GetOutboxService } from 'src/app/outbox/get-outbox.service';
import { MarkAsReadService } from 'src/app/inbox/mark-as-read.service';
import { DeleteMsgeService } from 'src/app/delete-msge.service';

@Component({
  selector: 'app-filter-msges',
  templateUrl: './filter-msges.component.html',
  styleUrls: ['./filter-msges.component.css'],
})
export class FilterMsgesComponent implements OnInit {
  public loggedUser = {} as userLoggedIn;
  private isLoggedInSubscriber!: Subscription;
  private inboxMessagesSubscriber!: Subscription;
  private outboxMessagesSubscriber!: Subscription;
  private deleteMsgeSubscriber!: Subscription;
  private markAsReadSubscriber!: Subscription;
  private inboxMsgsFull: inMessage[] = [];
  public inboxMsgsFiltered: inMessage[] = [];
  private outboxMsgsFull: outboxMessage[] = [];
  public outboxMsgsFiltered: outboxMessage[] = [];

  private subscribed_LI: boolean = false;
  private subscribed_GI: boolean = false;
  private subscribed_GO: boolean = false;
  private subscribed_DM: boolean = false;
  private subscribed_MR: boolean = false;

  constructor(
    private filterMsges: FilterMsgesService,
    private checkForLogIn: CheckForLogInService,
    private getInboxService: GetInboxService,
    private getOutboxService: GetOutboxService,
    private deleteMsgeService: DeleteMsgeService,
    private markAsReadService: MarkAsReadService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscriber = this.checkForLogIn.userIsLogged$.subscribe(
      (answer) => {
        // console.log('answer', answer);
        this.loggedUser.logged = answer;
        this.subscribed_LI = true;
        if (answer) {
          this.inboxMessagesSubscriber =
            this.getInboxService.inboxMessages$.subscribe((data) => {
              this.inboxMsgsFull = data;
              // console.log('GET INBOX', this.inboxMsgsFull);
              this.subscribed_GI = true;
            });
          this.outboxMessagesSubscriber =
            this.getOutboxService.outboxMessages$.subscribe((data) => {
              this.outboxMsgsFull = data;
              this.subscribed_GO = true;
              // console.log('GET outbox', this.outboxMsgsFull);
            });
        }
      }
    );
  }
  search(searchForm: NgForm) {
    let searchKey: string = searchForm.value.keyword;

    if (searchForm.value.type == 'Received') {
      // Search in Inbox
      this.inboxMsgsFiltered = this.inboxMsgsFull.filter(function (el) {
        if (el.fromName && el.body) {
          return el.fromName.includes(searchKey) || el.body.includes(searchKey);
        } else {
          return null;
        }
      });
      // console.log('inbox filter', this.inboxMsgsFiltered);
    } else if (searchForm.value.type == 'Sent') {
      // Search in Outbox

      this.outboxMsgsFiltered = this.outboxMsgsFull.filter(function (el) {
        if (el.to && el.body) {
          return el.to.includes(searchKey) || el.body.includes(searchKey);
        } else {
          return null;
        }
      });
      // console.log('outbox filter', this.outboxMsgsFiltered);
    }
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
    console.log('READ', msgId);
    this.markAsReadSubscriber = this.markAsReadService
      .markMsgeAsRead(msgId, mark)
      .subscribe((res: boolean) => {
        this.subscribed_MR = true;
        console.log(res);
      });
  }

  outboxDelete(msgId: number, box: string) {
    this.deleteMsgeSubscriber = this.deleteMsgeService
      .deleteMsge(msgId, box)
      .subscribe((res: boolean) => {
        console.log(res);
        this.ngOnInit();
      });
  }

  ngOnDestroy(): void {
    if (this.subscribed_LI) {
      this.isLoggedInSubscriber.unsubscribe();
    }
    if (this.subscribed_GI) {
      this.inboxMessagesSubscriber.unsubscribe();
    }
    if (this.subscribed_GO) {
      this.outboxMessagesSubscriber.unsubscribe();
    }
    if (this.subscribed_DM) {
      this.deleteMsgeSubscriber.unsubscribe();
    }
    if (this.subscribed_MR) {
      this.markAsReadSubscriber.unsubscribe();
    }
  }
}
