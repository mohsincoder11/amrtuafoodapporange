import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyuserPage } from './verifyuser.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyuserPageRoutingModule {}
