
export interface TransactionHttp {
  id: string;
  accountHolder: string;
  iban: string;
  amount: number;
  date: string;
  note: string;
}

export interface Transaction extends Omit<TransactionHttp, 'date' | 'id'> {
  id?: string;
  date: any;
}

export type TransactionRefineCriterion = {
  orderBy: string;
  filterBy: string;
}
