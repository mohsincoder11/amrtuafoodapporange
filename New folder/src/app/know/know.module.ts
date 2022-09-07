import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnowPageRoutingModule } from './know-routing.module';

import { KnowPage } from './know.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnowPageRoutingModule
  ],
  declarations: [KnowPage]
})
export class KnowPageModule {}
