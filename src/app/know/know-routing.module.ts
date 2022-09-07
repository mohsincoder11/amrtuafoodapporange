import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowPage } from './know.page';

const routes: Routes = [
  {
    path: '',
    component: KnowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowPageRoutingModule {}
