import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { TransactionTransformationService } from "./transaction-transformation.service";

describe('TransactionTransformationService', () => {
  let criterions$: BehaviorSubject<any>;
  let service: TransactionTransformationService;

  beforeEach(() => {
    criterions$ = new BehaviorSubject({
      orderBy: 'date',
      filterBy: ''
    });

    service = new TransactionTransformationService();
  });

  it('should order by amount', (done) => {
    criterions$.next({...criterions$.value, orderBy: 'amount'});

    service.filterOrderList$(criterions$, data).pipe(take(1)).subscribe(([record]) => {
      expect(record.id).toEqual(1);
      done();
    });
  });

  it('should filter data', (done) => {
    criterions$.next({...criterions$.value, filterBy: 'FG'});

    service.filterOrderList$(criterions$, data).pipe(take(1)).subscribe((records) => {
      expect(records.length).toEqual(2);
      done();
    });
  });

  it('should order by date', (done) => {
    service.filterOrderList$(criterions$, data).pipe(take(1)).subscribe(([record]) => {
      expect(record.id).toEqual(2);
      done();
    });
  });
});

const data = [{
  id: 0,
  amount: 23.56,
  accountHolder: 'FG',
  date: '2021-03-23'
},
{
  id: 1,
  amount: 666656.56,
  accountHolder: 'FG',
  date: '2021-05-23'
},
{
  id: 2,
  amount: 200.56,
  accountHolder: 'GF',
  date: '2021-07-02'
}];