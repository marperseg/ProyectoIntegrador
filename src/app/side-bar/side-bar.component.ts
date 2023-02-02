import { Component, OnInit } from '@angular/core';
import { CheckForLogInService } from 'src/app/check-for-log-in.service';
import { Subscription } from 'rxjs';
import { userLoggedIn } from 'src/app/types';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  //implements OnInit
  private getCheckLogIn!: Subscription;
  public loggedUser = {} as userLoggedIn;
  private isLoggedInSubsciber!: Subscription;
  showFiller: boolean = false;

  private subcribed_LI: boolean = false;
  private subcribed_CLI: boolean = false;


  constructor(private checkForLogIn: CheckForLogInService) {}

  checkLogged(isLogged: boolean): void {
    // this.usersSelectedID = Selection;
    this.getCheckLogIn.unsubscribe();
    if (isLogged) {
      this.ngOnInit();
      // console.log('checkLogged ', isLogged, this.loggedUser);
    }
    // console.log('usersSelectedName', this.usersSelectedNames);
  }

  ngOnInit(): void {
    this.isLoggedInSubsciber = this.checkForLogIn.userIsLogged$.subscribe(
      (answer) => {
        // console.log('answer', answer);
        this.loggedUser.logged = answer;
        this.subcribed_LI = true;
        if (answer) {
          this.getCheckLogIn = this.checkForLogIn
            .getCheckLI()
            .subscribe((data: userLoggedIn) => {
              this.loggedUser = data;
              this.subcribed_CLI = true;
              // console.log('userLoggedIn ngOnInit', this.loggedUser);

            });
        }
      }
    );

  }
  ngOnDestroy(): void {
    if (this.subcribed_CLI) this.getCheckLogIn.unsubscribe();
    if (this.subcribed_LI) this.isLoggedInSubsciber.unsubscribe();
  }


}
