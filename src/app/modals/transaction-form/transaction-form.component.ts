import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { ModalController } from '@ionic/angular';
import { TransactionStoreService } from 'src/app/services/transaction-store.service';
import { Transaction } from 'src/app/types';
import { MaxDecimal, toFloat } from '../../shared';

@Component({
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  @Input()
  data: Transaction;

  fGroup: FormGroup;

  get minDate(): string {
    const now = new Date().toISOString();
    return this._formatDate(now);
  }

  get ibanCtrl(): AbstractControl | undefined {
    return this.fGroup?.controls?.iban;
  }

  get amountCtrl(): AbstractControl | undefined {
    return this.fGroup?.controls?.amount;
  }

  get accountHolderCtrl():AbstractControl | undefined {
    return this.fGroup?.controls?.accountHolder;
  }

  get dateCtrl(): AbstractControl | undefined {
    return this.fGroup?.controls?.date;
  }

  constructor(
    private _storeService: TransactionStoreService,
    private readonly _fb: FormBuilder,
    private readonly _modalCtrl: ModalController) {
      this.fGroup = this._fb.group({
        id: new FormControl(''),
        accountHolder: new FormControl('', [Validators.required]),
        iban: new FormControl('', [Validators.required, ValidatorService.validateIban]),
        amount: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(11),
          Validators.min(50),
          Validators.max(20000000),
          MaxDecimal(2)
        ]),
        date: new FormControl('', [Validators.required]),
        note: new FormControl('')
      });
    }

  ngOnInit(): void {
    if (this.data) {
      this.fGroup.patchValue({...this.data});
    }
  }

  save(): void {
    if (this.fGroup.valid) {
      let { id, date, amount } = this.fGroup.value;
      const data = {...this.fGroup.value, date: this._formatDate(date), amount: toFloat(amount)};
      this._storeService[(id) ? 'update' : 'add'](data);
      this._modalCtrl.dismiss(data);
    }
  }

  cancel(): void {
    this._modalCtrl.dismiss(null);
  }

  error(messages: any, errors: any): string {
    if (errors) {
      const message = messages[Object.keys(errors)[0]];
      if (message) {
        return message;
      }
    }

    console.warn(`Error not found for messages ${JSON.stringify(messages)}, errors ${JSON.stringify(errors)}`);

    return '';
  }

  private _formatDate(date: string): string {
    return `${date.split('T')[0]}`;
  }
}