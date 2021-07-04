import { Component } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TransactionStoreService } from '../services/transaction-store.service';
import { TransactionTransformationService } from '../services/transaction-transformation.service';
import { Transaction, TransactionRefineCriterion } from '../types';
import { RefineTransactionComponent } from './refine-transaction/refine-transaction.component';
import { TOAST_DURATION, TOAST_COLOR, TOAST_DEFAULT_POSITION } from '../constants';
import { TranslationService as _t} from '../services/translation.service';
import { TransactionFormComponent } from '../modals/transaction-form/transaction-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _records$: Observable<Array<Transaction>> = of([]);

  private _refineCriterion$: BehaviorSubject<TransactionRefineCriterion> = new BehaviorSubject(DEFAULT_TRANSACTION_REFINE_CRITERION);

  get records$(): Observable<Array<Transaction>> {
    return this._records$;
  }

  get disabledRefineOptions(): boolean {
    return !this._storeService.value.length ? true : false;
  }

  noRecordsMessage: string;

  constructor(
    private readonly _modalCtrl: ModalController,
    private readonly _alertCtrl: AlertController,
    private readonly _toastCtrl: ToastController,
    private readonly _popoverCtrl: PopoverController,
    private readonly _storeService: TransactionStoreService,
    private readonly _transactionTransformService: TransactionTransformationService) {
      this._records$ = this._storeService.all$().pipe(switchMap(data => {
        return this._transactionTransformService.filterOrderList$(this._refineCriterion$, data);
      }), tap(records => {
        if (!this.noRecordsMessage && !records.length) {
          this.noRecordsMessage = _t.instant('home.transactions.empty');
        }
      }));
    }

  async edit(id?: string): Promise<void> {
    const record = this._storeService.get(id);
    if (record) {
      const modal = await this._modalCtrl.create({
        component: TransactionFormComponent,
        componentProps: { data: record },
        swipeToClose: true,
      });
  
      modal.present();
  
      const { data } = await modal.onDidDismiss();
      if (data) {
        const { filterBy } = this._refineCriterion$.value;
        if (filterBy === record.accountHolder) {
          this._refineCriterion$.next({...this._refineCriterion$.value, filterBy: data.accountHolder});
        }
        
        (await this._toast('Transaction updated !')).present();
      }
    } else {
      console.log('Error !!');
    }
  }

  async add(): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: TransactionFormComponent,
      componentProps: {
        data: null
      },
      swipeToClose: true,
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      (await this._toast('Transaction added !')).present();
    }
  }

  async delete(id?: string): Promise<void> {
    const alert = await this._alertCtrl.create({
      header: _t.instant('delete.transaction.alert.title'),
      message: _t.instant('delete.transaction.alert.message'),
      buttons: [{
        text: _t.instant('button.no'),
        role: 'cancel'
      }, {
        text: _t.instant('button.yes'),
        handler: async () => {
          this._storeService.delete(id);
          (await this._toast(_t.instant('delete.transaction.toast.message'))).present();
        }
      }]
    });

    await alert.present();
  }

  async refine(evt: any): Promise<void> {
    const popover = await this._popoverCtrl.create({
      component: RefineTransactionComponent,
      componentProps: {
        accountHolders: this._storeService.value.reduce((acc, c) => {
          const { accountHolder } = c;
          if (acc.indexOf(accountHolder) === -1) {
            acc.push(accountHolder);
          }
    
          return [...acc];
        }, []),
        values: {...this._refineCriterion$.value}
      },
      event: evt,
      cssClass: 'refine-popover',
    });

    await popover.present();
    const { data } = await popover.onDidDismiss();

    if (data) {
      const {filterBy, orderBy} = data;
      this._refineCriterion$.next({
        filterBy,
        orderBy
      });
    }
  }

  private _toast(message: string, position: any = TOAST_DEFAULT_POSITION): any {
    return this._toastCtrl.create({
      message,
      position,
      duration: TOAST_DURATION,
      color: TOAST_COLOR
    });
  }
}

const DEFAULT_TRANSACTION_REFINE_CRITERION:TransactionRefineCriterion = {
  orderBy: 'date',
  filterBy: ''
};
