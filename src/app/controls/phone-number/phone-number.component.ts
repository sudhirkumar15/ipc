import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  ViewChild,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms/';

import { Util } from '../../util';
import { Global } from '../../g';
import { CountryListReponse } from '../../data/model/country.model';
import { CommonData } from '../../data/bucket/countries.bucket';
import { CommonService } from '../../service/common.service';
let _this;

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberComponent),
      multi: true
    }
  ]
})
export class PhoneNumberComponent implements OnInit, ControlValueAccessor {
  @Input() selection: string;
  @Input() _countrycode: string;
  @ViewChild('ul') ul: ElementRef;

  keyTypeText = '';
  propagateChange = (_: any) => { };
  constructor(
    private commonService: CommonService,
    public global: Global,
    public commonDataStore: CommonData,
    public util: Util
  ) { _this = this; }

  ngOnInit() {
    this.commonService.getCountries();
  }

  writeValue(value: any) {
    this.selection = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) { }

  triggerListItemClick(itemValue) {
    this.selection = itemValue;
    this.propagateChange(this.selection);
  }
  onOptionClick(event) {
    const currentList = event.currentTarget.getElementsByClassName('ul-list')[0];
    currentList.style.display = currentList.style.display === 'none' || currentList.style.display === '' ? 'block' : 'none';
    this.ul.nativeElement.children[0].focus();
    this.keyTypeText = '';
  }
  focusSelectedValue(event: KeyboardEvent) {
    this.keyTypeText = event.key.trim();
    const searchedIndex = [];
    const filtered_data = this.commonDataStore.countries.value.data.countries.filter((item, index) => {
      if (item['name'].toLowerCase().startsWith(this.keyTypeText.toLowerCase())) {
        searchedIndex.push(index);
        return index;
      }
    });

    if (searchedIndex.length > 0) {
      this.ul.nativeElement.children[searchedIndex[0]].focus();
    }

  }
}
