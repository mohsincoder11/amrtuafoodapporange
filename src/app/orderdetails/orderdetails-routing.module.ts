import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderdetailsPage } from './orderdetails.page';

const routes: Routes = [
  {
    path: ':id',
    component: OrderdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderdetailsPageRoutingModule {}
