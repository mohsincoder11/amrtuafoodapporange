import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyotpPage } from './verifyotp.page';

const routes: Routes = [
  {
    path: ':mob',
    component: VerifyotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyotpPageRoutingModule {}
