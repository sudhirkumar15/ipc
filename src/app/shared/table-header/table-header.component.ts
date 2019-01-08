import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Global } from '../../g';
import { DropDownModel } from '../../data/model/dropdown.model';
import { AccessModel } from '@repository/model/access.model';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit, AfterViewInit {
  /**
   * Page Heading input
   **/
  @Input() heading;
  /**
   * dropdown input
   **/
  @Input() dropdown;
  /**
   * Page Button Label input
   **/
  @Input() buttonLabel;
  @Input() id;
  /**
   * site listing
   **/
  _dropdownList: Array<DropDownModel> = [];
  @Input()
  set dropdownList(items: Array<DropDownModel>) {
    this._dropdownList = items;
    this.updateList();
  }

  /**
  * selected name on dropdown
  **/
  @Input() selectedName: string;
  /**
   * DataTable Search input
   **/
  @Input() updateFilter;

  /**
  * DataTable Row Selected input
  **/
  @Input() onRowSelected: number;


  /**
   * Page Button click event emitter output
   **/
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  /**
  * search event emitter output
  **/
  @Output() filterBy: EventEmitter<string> = new EventEmitter<string>();
  /**
  * selected siteName id event emitter
  **/
  @Output() onDropdownItemClick: EventEmitter<DropDownModel> = new EventEmitter<DropDownModel>();
  /**
   * search on keyUp timeOutId
   **/
  timeoutId: any = null;
  listItems: Array<any> = [];
  selectedItemValue: number;

  @Input() hasAccess: AccessModel;
  @Input()
  set selectedItem(id: number) {
    this.selectedItemValue = id;
    this.updateList();
  }
  isDropdownOpen = false;
  @ViewChild('highlight') highlight: ElementRef;
  constructor(public global: Global,
    private route: ActivatedRoute,
    private tableDropdown: DropDownModel,
    private element: ElementRef,
    private render: Renderer2
  ) {

  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.highlight.nativeElement.focus();
  }
  private updateList() {
    if (this._dropdownList) {
      this._dropdownList.map((tableDropdown) => {
        if (this.selectedItemValue === tableDropdown['id']) {
          this.selectedName = tableDropdown['name'];
        }
      });
    }

  }
  triggerButtonClick(event: string, id: string) {
    this.onButtonClick.emit({ event: event, id: id });
  }
  onKeyupInputFld(event: string) {
    this.cancelDelayedIncrement();
    this.timeoutId = setTimeout(() => {
      this.filterBy.emit(event);
      this.timeoutId = null;
    }, 1500);
  }
  private cancelDelayedIncrement(): void {
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  openDropdown() {
    if (this.dropdown && !this.isDropdownOpen) {
      this.listItems = this._dropdownList;
      this.isDropdownOpen = false;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onDropdownClick(event: string, id: number) {
    this.tableDropdown['name'] = event;
    this.tableDropdown['id'] = id;
    this.onDropdownItemClick.emit(this.tableDropdown);
  }
  focus() {
    this.element.nativeElement.querySelector('#heading').focus();
  }
}
