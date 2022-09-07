import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetOTPPageRoutingModule } from './get-otp-routing.module';

import { GetOTPPage } from './get-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetOTPPageRoutingModule
  ],
  declarations: [GetOTPPage]
})
export class GetOTPPageModule {}
