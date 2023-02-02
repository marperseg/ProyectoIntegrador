import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { GetAddressService } from './get-address.service';
import { CheckForLogInService } from 'src/app/check-for-log-in.service';
import { Subscription } from 'rxjs';
import { UserCreated, userLoggedIn } from 'src/app/types';

@Component({
  selector: 'app-msg-to',
  templateUrl: './msg-to.component.html',
  styleUrls: ['./msg-to.component.css'],
})
export class MsgToComponent implements OnInit {
  private getAddressSubscriber!: Subscription;
  private getCheckLogIn!: Subscription;
  public usersRetrived: UserCreated[] = [];
  public usersSelected: UserCreated[] = [];
  public loggedUser = {} as userLoggedIn;

  public subscribed_CLI: boolean = false;
  public subscribed_GA: boolean = false;

  @Output() selected = new EventEmitter<UserCreated[]>();

  selector(usersSelected: UserCreated[]) {
    this.selected.emit(usersSelected);
    // console.log('usersSelected', usersSelected);
  }

  // dataChanged(event: UserCreated[]) {
  //   console.log(event);
  //   this.selector(event);
  // }

  constructor(
    private getAddressService: GetAddressService,
    private checkForLogIn: CheckForLogInService
  ) {}

  ngOnInit(): void {
    this.getCheckLogIn = this.checkForLogIn
      .getCheckLI()
      .subscribe((data: userLoggedIn) => {
        this.loggedUser = data;
        this.subscribed_CLI = true;
        // console.log('userLoggedIn ngOnInit', this.loggedUser);
        if (this.loggedUser.logged) {
          this.getAddressSubscriber = this.getAddressService
            .getAddresses()
            .subscribe((data) => {
              this.subscribed_GA = true;
              this.usersRetrived = data;
              // console.log('subscr', data);
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscribed_GA) this.getAddressSubscriber.unsubscribe();
    if (this.subscribed_CLI) this.getCheckLogIn.unsubscribe();
  }
}
