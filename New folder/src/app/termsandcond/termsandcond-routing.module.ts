import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsandcondPage } from './termsandcond.page';

const routes: Routes = [
  {
    path: '',
    component: TermsandcondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsandcondPageRoutingModule {}
