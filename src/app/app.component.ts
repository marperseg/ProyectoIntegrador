import { Component } from '@angular/core';
import { CheckForLogInService } from './check-for-log-in.service';
import { Subscription } from 'rxjs';
import { userLoggedIn } from 'src/app/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TI_front';
  private getCheckLogIn!: Subscription;
  public loggedUser = {} as userLoggedIn;

  constructor(private checkForLogIn: CheckForLogInService) {}

  ngOnInit(): void {
    this.getCheckLogIn = this.checkForLogIn
      .getCheckLI()
      .subscribe((data: userLoggedIn) => {
        this.loggedUser = data;
        // console.log('userLoggedIn', data);
      });
  }

  ngOnDestroy(): void {
    this.getCheckLogIn.unsubscribe();
  }
}
