import { Component, OnInit } from '@angular/core';
import { SingUpService } from '../sing-up.service';
import { Subscription } from 'rxjs';
import { LogOutService } from 'src/app/log-in/log-out.service';

import { City, Country, NewUser, UserCreated } from 'src/app/types';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent implements OnInit {
  private singUpSubscriber!: Subscription;
  private logOutSubscriber!: Subscription;
  public newUser = {} as NewUser;
  public userCreated = {} as UserCreated;
  public passCorrect: boolean = true;

  private subscribed_SU: boolean = false;
  private subscribed_LO: boolean = false;

  constructor(
    private singUpService: SingUpService,
    private logOutService: LogOutService
  ) {}

  ngOnInit(): void {}

  singUpSubmit(singUpForm: NgForm) {
    console.log(singUpForm.value);
    this.checkPassword(
      singUpForm.value.password,
      singUpForm.value.confirmPassword
    );

    if (this.passCorrect) {
      //   this.logInSuscriber = this.logInService.postUser(usr).subscribe((data) => {
      // console.log(JSON.stringify(data));
      this.singUpSubscriber = this.singUpService
        .putUser(singUpForm.value)
        .subscribe((data) => {
          this.subscribed_SU = true;
          this.userCreated = data;
          console.log('subscr', data);
        });
    }
  }

  logOut() {
    this.logOutSubscriber = this.logOutService.getLogOut().subscribe(() => {
      console.log('User logged out...');
      this.subscribed_LO = true;
    });
  }

  checkPassword(pass: string, confPass: string): void {
    if (pass == confPass) {
      this.passCorrect = true;
    } else {
      this.passCorrect = false;
    }
    console.log(this.passCorrect, pass, confPass);
    return;
  }

  ngOnDestroy(): void {
    if (this.subscribed_LO) this.logOutSubscriber.unsubscribe();
    if (this.subscribed_SU) this.singUpSubscriber.unsubscribe();
  }

  public citiesAR: City[] = [
    { value: 'Buenos Aires' },
    { value: 'Salta' },
    { value: 'Córdoba' },
    { value: 'Rosario' },
  ];

  public citiesBR: City[] = [
    { value: 'San Pablo' },
    { value: 'Rio de Janeiro' },
    { value: 'Brasilia' },
    { value: 'Port Bello' },
  ];

  public citiesUR: City[] = [{ value: 'Montevideo' }, { value: 'Colonia' }];

  public citiesCH: City[] = [
    { value: 'Santiago' },
    { value: 'Punta Arenas' },
    { value: 'Viña del Mar' },
  ];

  public citiesMX: City[] = [
    { value: 'Ciuada de Mexico' },
    { value: 'Guadalajara' },
    { value: 'Monterrey' },
    { value: 'Cancún' },
  ];

  public countries: Country[] = [
    { value: 'Argentina', cities: this.citiesAR },
    { value: 'Brasil' },
    { value: 'Uruguay' },
    { value: 'Chile' },
    { value: 'Mexico' },
  ];
}
