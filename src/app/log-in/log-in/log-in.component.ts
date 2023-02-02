import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LogInService } from '../log-in.service';
import { CheckForLogInService } from 'src/app/check-for-log-in.service';
import { LogOutService } from '../log-out.service';
import { User, userLoggedIn } from 'src/app/types';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  private logInSubscriber!: Subscription;
  private getCheckLogIn!: Subscription;
  private logOutSubscriber!: Subscription;
  private isLoggedInSubsciber!: Subscription;

  public loggedUser = {} as userLoggedIn;
  public subscribedLI: boolean = false;
  public subscribedLO: boolean = false;
  public subscribedCLI: boolean = false;

  constructor(
    private logInService: LogInService,
    private checkForLogIn: CheckForLogInService,
    private logOutService: LogOutService
  ) {}

  ngOnInit(): void {
    this.getCheckLogIn = this.checkForLogIn
      .getCheckLI()
      .subscribe((data: userLoggedIn) => {
        this.loggedUser = data;
        this.checkForLogIn.set_userIsLogged(data.logged);
        this.subscribedCLI = true;
        // console.log('userLoggedIn', data);
      });
  }

  logInSubmit(logInForm: NgForm) {
    this.logInSubscriber = this.logInService
      .postUser(logInForm.value)
      .subscribe((data) => {
        this.loggedUser = data;
        // console.log('subscr', data);
        this.checkForLogIn.set_userIsLogged(true);
        this.subscribedLI = true;
      });
  }

  logOut() {
    this.logOutSubscriber = this.logOutService.getLogOut().subscribe(() => {
      // console.log('User logged out...');
      this.checkForLogIn.set_userIsLogged(false);
      this.ngOnInit();
    });
    window.location.reload();
    this.subscribedLO = true;
  }

  ngOnDestroy(): void {
    if (this.subscribedLI) {
      this.logInSubscriber.unsubscribe();
    }
    if (this.subscribedLO) {
      this.logOutSubscriber.unsubscribe();
    }
    if (this.subscribedCLI) {
      this.getCheckLogIn.unsubscribe();
    }
  }
}
