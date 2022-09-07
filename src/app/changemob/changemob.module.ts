import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangemobPageRoutingModule } from './changemob-routing.module';

import { ChangemobPage } from './changemob.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangemobPageRoutingModule
  ],
  declarations: [ChangemobPage]
})
export class ChangemobPageModule {}
