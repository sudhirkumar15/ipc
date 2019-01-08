import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Global } from '../g';
import { PaginationModel } from '../data/pagination.model';
import { ContextMenuModel } from '@repository/model/context-menu.model';

let _this;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  /**
   *  To store table data. It will be set by the app-data-table impelemented
   *  component
   */
  @Input() tableData;
  /**
   * Datatable column informations
   */
  @Input() columns;

  /**
   * Boolean  Flag for to show the loading indicator
   */
  @Input() loadingIndicator;
  /**
   *  Row Details
   */
  @Input() rowdetails;

  @Input() selected;
  /**
   * Pagination Data
   */
  @Input() pagination: PaginationModel;

  @Input() rowDetailsTemplate: TemplateRef<any>;

  @Input() tableName: string;

  @Input() lockCol: boolean;

  /**
   * Sticky table toolbar & header
   **/
  @Input() isSticky;

  @Input() showSettings = true;

  /**
   * When user click the page number,this event emitter emit the message.
   * It should be handled by the parent component
   */
  @Output() pageAction = new EventEmitter<PaginationModel>();
  /**
   * When user click the column for sorting,this event emitter emit the mesage
   * It should be handled by the parent component
   */
  @Output() sortByAction = new EventEmitter<string>();
  /**
   * Local reference for dataTable
   */
  @ViewChild('impDatatable') impDatatable: DatatableComponent;
  /**
   * Flag for to show the toolbar
   */
  isShowToolbar = false;
  /**
   * To display the page sizes
   */
  pageSizes: Array<number>;
  selectedRows: Array<any>;
  /**
   * To show all the columns for columns toggling
   */
  allColumns: Array<{}>;
  isDropDownOpen: boolean;
  @Input() isRowDetailsEnable: boolean;
  @Input() groupExpansionDefault: boolean;
  @Input() isShowExportButton: boolean;
  @Input() groupRowsBy: string;
  @Input() defaultSort: any;
  @Input() selectionType:string;
  @Output() activate = new EventEmitter<any>();
  @Input() contextualMenu: Array<ContextMenuModel>;
  /**
   * This event will trigger when user do any action on contextual menu
   */
  @Output() OnContextMenu = new EventEmitter<{ actionCode: string, rows: Array<any> }>();

  @Output()  onSelected = new EventEmitter<any>();

  constructor(public global: Global
  ) { _this = this; }

  ngOnInit() {
    this.isShowToolbar = false;
    _this.pageSizes = _this.global.config.pageSizes;
    if (this.columns) {
      this.columns.forEach(function (row, index) {
        row.order = index;
      });
      this.allColumns = this.columns.slice();
    }
  }
  /**
     *Settings dropDown click outside close
  */
  onDropdownOutsideClick($event) {
    this.isDropDownOpen = false;
  }

  onSort(event: {}) {
    _this.sortByAction.emit(event);
  }

  onSelect(row) {
    this.selectedRows = row.selected;
    this.isShowToolbar = this.selectedRows.length > 0 ? true : false;
    this.onSelected.emit(this.selectedRows);
  }

  onClickPageSize(pageSize: number) {
    _this.pagination.pageSize = pageSize;
    _this.pageAction.emit(_this.pagination);
  }

  navigatePage(toPage: number) {
    if (this.pagination.isFirst && toPage === -1) {
      return false;
    }
    if (this.pagination.isLast && toPage === +1) {
      return false;
    }
    _this.pagination.pageNumber = _this.pagination.pageNumber + toPage;
    _this.pageAction.emit(_this.pagination);
  }

  toggle(col: any) {
    const isChecked = this.isChecked(col);
    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      let index;
      this.allColumns.filter((c, i) => {
        if (c['name'] === col.name) {
          index = i;
        }
      });
      this.columns.splice(index, 0, col);
      this.columns.sort((a, b) => a.order > b.order);
      this.columns = [...this.columns];
    }
    return isChecked;
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  getRowGroupName(group) {
    let groupHeaderName = '';
    switch (this.tableName) {
      case 'role':
        groupHeaderName = group.value[0].isGlobal ? 'Default' : 'Custom';
        break;
      default:
        groupHeaderName = '';
    }
    return groupHeaderName;
  }

  onActivate(event) {
    if (event.type === 'checkbox') {
      event.event.stopPropagation();
    } else {
      this.activate.emit(event);
    }
  }

  contextMenuAction(actionCode: string) {
    const action = {
      actionCode: actionCode,
      rows: this.selectedRows
    };
    this.OnContextMenu.emit(action);
  }
}
