import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdrcandelResonPage } from './odrcandel-reson.page';

const routes: Routes = [
  {
    path: '',
    component: OdrcandelResonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdrcandelResonPageRoutingModule {}
