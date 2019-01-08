import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Global } from 'app/g';

@Component({
  selector: 'app-product-modal-search',
  templateUrl: './product-modal-search.component.html',
  styleUrls: ['./product-modal-search.component.scss']
})
export class ProductModalSearchComponent implements OnInit {

  timeoutId: any = null;

  @Input() labelText;

   /**
  * search event emitter output
  **/
 @Output() searchBy: EventEmitter<string> = new EventEmitter<string>();

  constructor(public global: Global) { }

  ngOnInit() {
  }

  private cancelDelayedIncrement(): void {
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  onKeyupInputFld(event: string) {
    this.cancelDelayedIncrement();
    this.timeoutId = setTimeout(() => {
      this.searchBy.emit(event);
      this.timeoutId = null;
    }, 1500);
  }




}
