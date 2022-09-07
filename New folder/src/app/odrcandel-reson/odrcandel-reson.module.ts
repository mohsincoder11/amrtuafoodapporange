import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdrcandelResonPageRoutingModule } from './odrcandel-reson-routing.module';

import { OdrcandelResonPage } from './odrcandel-reson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdrcandelResonPageRoutingModule
  ],
  declarations: [OdrcandelResonPage]
})
export class OdrcandelResonPageModule {}
