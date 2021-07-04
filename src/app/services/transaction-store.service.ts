import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../types';
import { TransactionHttpService } from './transaction-http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionStoreService {
  private readonly _store: BehaviorSubject<Array<Transaction>> = new BehaviorSubject([]);

  constructor(private readonly _httpService: TransactionHttpService) {
    this._httpService.getAll$().pipe(take(1)).subscribe(data => {
      this._store.next(data);
    });
  }

  get value(): Array<Transaction> {
    return [...this._store.value];
  }

  all$(): Observable<Array<Transaction>> {
    return this._store;
  }

  get(id: string): Transaction {
    return this._store.value.find(t => t.id === id);
  } 

  delete(id: string): void {
    this._httpService.delete$(id).pipe(take(1)).subscribe(() => {
      this._store.next(this._store.value.filter(({id: cid}) => id !== cid));
    });
  }

  add(data: Transaction): void {
    const toSave = {...data, id: uuidv4()};

    this._httpService
      .add$(toSave)
      .pipe(take(1))
      .subscribe(() => {
        this._store.next([...this._store.value, toSave]);
      });
  }

  update(data: Transaction): any {
    this._httpService
      .update$(data)
      .pipe(take(1))
      .subscribe(() => {
        this._store.next([...this._store.value.map((t) => {
          if (data.id === t.id) {
            return {...data};
          }

          return t;
        })])
      });
  }
}