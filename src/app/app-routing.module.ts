import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { SingUpComponent } from './sing-up/sing-up/sing-up.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ComposeComponent } from './compose/compose/compose.component';

const routes: Routes = [
  { path: 'home', component: SideBarComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full'  },
  { path: 'singUp', component: SingUpComponent },
  { path: 'compose', component: ComposeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
