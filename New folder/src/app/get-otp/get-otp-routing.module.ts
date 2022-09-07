import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetOTPPage } from './get-otp.page';

const routes: Routes = [
  {
    path: ':mob',
    component: GetOTPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetOTPPageRoutingModule {}
