import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangemobPage } from './changemob.page';

const routes: Routes = [
  {
    path: ':mob',
    component: ChangemobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangemobPageRoutingModule {}
