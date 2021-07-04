import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-refine-transaction',
  templateUrl: './refine-transaction.component.html',
  styleUrls: ['./refine-transaction.component.scss'],
})
export class RefineTransactionComponent {
  @Input()
  accountHolders: Array<string>;

  @Input()
  values: any;

  fGroup: FormGroup;

  constructor(
    private readonly _popoverCtrl: PopoverController,
    private readonly _fb: FormBuilder) {
      this.fGroup = this._fb.group({
        filterBy: new FormControl(''),
        orderBy: new FormControl('')
      });
    }

  ngOnInit(): void {
    if (this.values) {
      this.fGroup.patchValue(this.values);
    }
  }

  submit(): void {
    this._popoverCtrl.dismiss(this.fGroup.value);
  }
}
