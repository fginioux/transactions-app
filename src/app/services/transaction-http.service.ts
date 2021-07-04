import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay, map, take, filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, TransactionHttp } from '../types';
import { TransactionTransformationService } from './transaction-transformation.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionHttpService {
  private _store: BehaviorSubject<Array<TransactionHttp>> = new BehaviorSubject([...data]);
  
  constructor(private readonly _transformService: TransactionTransformationService) {}

  getAll$(): Observable<Array<Transaction>> {
    return this._store.pipe(map(records => {
      return records.map(t => this._transformService.toTransaction(t));
    }), delay(250));
  }

  get$(id: string): Observable<Transaction> {
    return this._store
      .pipe(
        map(records => records.find((t) => t.id === id)),
        map(t => t ? this._transformService.toTransaction(t) : t),
        delay(100)
      );
  }

  async get(id: string): Promise<Transaction> {
    return await this.get$(id).toPromise();
  }

  update$(data: Transaction): Observable<Transaction> {
    return of(this._transformService.toTransationHttp(data)).pipe(tap(() => {
      this._store.next(this._store.value.map(t => {
        if (t.id === data.id) {
          return {...this._transformService.toTransationHttp(data)};
        }

        return t;
      }));

      console.info(`HTTP Service: update request transaction ${data.id}...`);
    }), delay(100), map(t => this._transformService.toTransaction(t)));
  }

  add$(data: Transaction): Observable<Transaction> {
    return of(this._transformService.toTransationHttp(data)).pipe(tap(() => {
      this._store.next([...this._store.value, this._transformService.toTransationHttp(data)]);

      console.info(`HTTP Service: add request transaction ${data.id}`);
    }), delay(100), map(t => this._transformService.toTransaction(t)));
  }

  delete$(id: string): Observable<string> {
    return of(id).pipe(tap(() => {
      this._store.next(this._store.value.filter((t) => t.id !== id));
      console.info(`HTTP Service: delete request transaction ${id}...`);
    }), delay(100));
  }
}

const data: Array<TransactionHttp> = [
  {
    id: 'c53208c4-1dad-4f38-979c-ff44218b9d8f',
    accountHolder: 'John Doe',
    iban: 'DE75512108001245126199',
    amount: 2300.75,
    date: '2021-04-12',
    note: 'Nothind special to add.'
  },
  {
    id: '27d5810c-1799-4b34-84db-70483890162b',
    accountHolder: 'John Doe',
    iban: 'DE75512108001245126199',
    amount: 3550.00,
    date: '2021-04-18',
    note: 'Special transfert to internal company.'
  },
  {
    id: '2a367924-09c6-49ea-bb06-0f3b9357fa31',
    accountHolder: 'Paul Dawson',
    iban: 'GI04BARC000001234567890',
    amount: 15600.50,
    date: '2021-04-24',
    note: 'Rest of contract with IMMO Ghbm Company.'
  },
  {
    id: 'b6b1d885-129c-4236-897c-69f95bac4618',
    accountHolder: 'Gil Roberts',
    iban: 'FR7630006000011234567890189',
    amount: 456.67,
    date: '2021-04-30',
    note: ''
  },
  {
    id: '3e3fff12-e7db-4671-8990-8d815ab4423f',
    accountHolder: 'Bob Kelly',
    iban: 'FI1410093000123458',
    amount: 30000.00,
    date: '2021-05-18',
    note: 'Special offer package payment.'
  }
];
