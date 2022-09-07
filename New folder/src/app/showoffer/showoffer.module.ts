import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowofferPageRoutingModule } from './showoffer-routing.module';

import { ShowofferPage } from './showoffer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowofferPageRoutingModule
  ],
  declarations: [ShowofferPage]
})
export class ShowofferPageModule {}
