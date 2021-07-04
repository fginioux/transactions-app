import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionHttp, Transaction } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TransactionTransformationService {
  toTransationHttp(data: Transaction): TransactionHttp {
    // format FE data to BE data
    return {...data} as any;
  }

  toTransaction(data: TransactionHttp): Transaction {
    // format BE data to FE data
    return {...data} as any;
  }

  filterOrderList$(criterion$: Observable<any>, arr: Array<any>): Observable<Array<any>> {
    return criterion$.pipe(map(({filterBy, orderBy}) => {
      return this._orderBy(orderBy, this._filterBy(arr, filterBy));
    }));
  }

  private _orderBy(orderBy: string, arr: Array<any>): Array<any> {
    if (orderBy === 'date') {
      return this._orderByDate(arr);
    } else if(orderBy === 'amount') {
      return this._orderByAmount(arr);
    }

    return arr;
  }

  private _orderByAmount(arr: Array<any>): Array<any> {
    const copy = [...arr];

    return copy.sort((a, b) => {
      return parseFloat(`${b.amount}`) - parseFloat(`${a.amount}`);
    });
  }

  private _orderByDate(arr: Array<any>): Array<any> {
    const copy = [...arr];

    return copy.sort((a, b) => {
      return a.date > b.date ? - 1 : 1;
    });
  }

  private _filterBy(arr: Array<any>, criterion: string): Array<any> {
    if (!criterion) {
      return [...arr];
    }

    return arr.filter(({accountHolder}) => {
      return accountHolder === criterion;
    });
  }
}