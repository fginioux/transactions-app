import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TransactionStoreService } from '../services/transaction-store.service';
import { Transaction } from '../types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnDestroy, OnInit {
  private readonly _destroy$ = new Subject();

  data: Transaction;

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _storeService: TransactionStoreService) {}

  ngOnInit(): void {
    const { id } = this._activeRoute.snapshot.params;
    if (id) {
      this._storeService.all$()
        .pipe(
          switchMap(() => of(this._storeService.get(id))),
          takeUntil(this._destroy$)
        )
        .subscribe(record => {
          this.data = record;
        });
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
