import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyuserPageRoutingModule } from './verifyuser-routing.module';

import { VerifyuserPage } from './verifyuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyuserPageRoutingModule
  ],
  declarations: [VerifyuserPage]
})
export class VerifyuserPageModule {}
