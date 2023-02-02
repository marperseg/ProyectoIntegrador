import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newMsgeConfirm, UserCreated, outMessage } from 'src/app/types';
import { ComposeService } from '../compose.service';

import { NgForm } from '@angular/forms';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
})
export class ComposeComponent implements OnInit {
  private composeSubscriber!: Subscription;
  public confirmation = {} as newMsgeConfirm;
  public usersSelectedID: string[] = [];
  public usersSelectedNames: string[] = [];
  public messageOut = {} as outMessage;

  private subscribed_C: boolean = false;

  onSelection(Selection: UserCreated[]) {
    // this.usersSelectedID = Selection;
    this.usersSelectedID = Selection.map((user) => user.userId);
    this.usersSelectedNames = Selection.map((user) => user.userName);
    // console.log('usersSelectedID', this.usersSelectedID);
    // console.log('usersSelectedName', this.usersSelectedNames);
  }

  constructor(private composeService: ComposeService) {}

  ngOnInit(): void {}

  composeSubmit(NewMsg: NgForm) {
    // console.log('NewMsg.value', NewMsg.value);
    this.messageOut = {
      from: '',
      to: this.usersSelectedID,
      toNames: this.usersSelectedNames,
      date: '',
      body: NewMsg.value.message,
    };
    // console.log('this.messageOut', this.messageOut);

    NewMsg.resetForm();

    this.composeSubscriber = this.composeService
      .sendMsge(this.messageOut)
      .subscribe((data) => {
        this.confirmation = data;
        this.subscribed_C = true;
        console.log('subscr', data);
        console.log('MSGE', this.messageOut);
      });
  }

  ngOnDestroy(): void {
    if (this.subscribed_C) this.composeSubscriber.unsubscribe();
  }
}
