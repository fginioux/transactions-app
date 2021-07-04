import { BehaviorSubject, Observable, of } from 'rxjs';
import { TransactionStoreService } from './transaction-store.service';

const data: Array<any> = [{
  id: '0'
}];

class HttpServiceMock {
  _subject: BehaviorSubject<any> = new BehaviorSubject(data);

  getAll$(): Observable<any> {
    return this._subject;
  }

  delete$(id: string): Observable<any> {
    return of([]);
  }

  add$(data: any): Observable<any> {
    return of([]);
  }

  update$(data: any): Observable<any> {
    return of([]);
  }
}

describe('TransactionStoreService', () => {
  let service: TransactionStoreService;
  let httpService: any;

  beforeEach(() => {
    httpService = new HttpServiceMock();
    service = new TransactionStoreService(httpService);
  });

  it('should add a record', (done) => {
    let i = 0;
    service.all$().subscribe(records => {
      i++;
      if (records.length === 2) {
        expect(i).toEqual(2);
        done();
      }
    });

    service.add({
      id: '@test',
      amount: 50.00
    } as any);
  });

  it('should update a record', (done) => {
    let i = 0;
    service.all$().subscribe(([record]) => {
      i++;
      if (i === 2) {
        expect(record.amount).toEqual(20.00);
        done();
      }
    });

    service.update({
      id: '0',
      amount: 20.00
    } as any);
  });

  it('should delete a record', (done) => {
    let i = 0;
    service.all$().subscribe(records => {
      i++;
      if (!records.length) {
        expect(i).toEqual(2);
        done();
      }
    });

    service.delete('0');
  });

  it('should get a record', () => {
    expect(service.get('0')).toBeDefined();
  });

  it('should return all records', (done) => {
    let i = 0;
    service.all$().subscribe(records => {
      i++;
      if (records.length) {
        expect(i).toEqual(1);
        done();
      }
    });
  });
});