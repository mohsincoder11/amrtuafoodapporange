import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowofferPage } from './showoffer.page';

const routes: Routes = [
  {
    path: '',
    component: ShowofferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowofferPageRoutingModule {}
