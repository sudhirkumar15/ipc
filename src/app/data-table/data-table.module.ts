import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableComponent } from './data-table.component';
import { DropDownOutsideClickDirective } from '../shared/directives/dropDown.directive';

@NgModule({
    declarations: [
        DataTableComponent,
        DropDownOutsideClickDirective
    ],
    imports: [
        CommonModule,
        NgxDatatableModule,
        BsDropdownModule.forRoot()
    ],
    exports: [
        DataTableComponent,
        DropDownOutsideClickDirective
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class DataTableModule { }
