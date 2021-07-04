import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularIbanModule } from 'angular-iban';

import { PipesModule } from '../shared';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { RefineTransactionComponent } from './refine-transaction/refine-transaction.component';
import { TransactionFormComponent } from '../modals/transaction-form/transaction-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipesModule,
    AngularIbanModule
  ],
  declarations: [HomePage, RefineTransactionComponent, TransactionFormComponent]
})
export class HomePageModule {}
