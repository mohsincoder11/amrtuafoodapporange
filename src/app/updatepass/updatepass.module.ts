import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatepassPageRoutingModule } from './updatepass-routing.module';

import { UpdatepassPage } from './updatepass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatepassPageRoutingModule
  ],
  declarations: [UpdatepassPage]
})
export class UpdatepassPageModule {}
