import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularIbanModule } from 'angular-iban';

import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../shared';
import { DetailPageRoutingModule } from './detail-routing.module';
import { DetailPage } from './detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    PipesModule,
    AngularIbanModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
