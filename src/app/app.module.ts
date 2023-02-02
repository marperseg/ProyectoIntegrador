import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LogInModule } from './log-in/log-in.module';
import { SingUpModule } from './sing-up/sing-up.module';
import { InboxModule } from './inbox/inbox.module';
import { OutboxModule } from './outbox/outbox.module';
import { ComposeModule } from './compose/compose.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopTabComponent } from './top-tab/top-tab.component';
import { FilterMsgesModule } from './filter-msges/filter-msges.module';

@NgModule({
  declarations: [AppComponent, SideBarComponent, TopTabComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    LogInModule,
    SingUpModule,
    InboxModule,
    ComposeModule,
    OutboxModule,
    FilterMsgesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
