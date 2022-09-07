import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsandcondPageRoutingModule } from './termsandcond-routing.module';

import { TermsandcondPage } from './termsandcond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsandcondPageRoutingModule
  ],
  declarations: [TermsandcondPage]
})
export class TermsandcondPageModule {}
