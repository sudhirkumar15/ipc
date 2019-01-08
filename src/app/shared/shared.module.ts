import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { TableHeaderComponent } from './table-header/table-header.component';
import { ScrollDirective } from './directives/scroll.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { TableDetailsWindowComponent } from './table-details-window/table-details-window.component';
import { TableDetailsWindowEventService } from './service/table-details-window-event.service';
import { TimeRemianingPipe } from './pipes/time-remianing.pipe';
import { AccessibilityClickDirective } from './directives/accessibility-click-handler.directive';
import { AccessibilityRouteDirective } from './directives/accessibility-route-handler.directive';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { MapToIterablePipe } from './pipes/map-to-iterable.pipe';
import { HasAccessDirective } from './directives/has-access.directive';
import { ProductModalComponent } from '@shared/product-modal/product-modal.component';
import { ProductModalSearchComponent } from '@shared/product-modal-search/product-modal-search.component';

@NgModule({
    declarations: [
        TableHeaderComponent,
        ScrollDirective,
        FileSizePipe,
        TableDetailsWindowComponent,
        TimeRemianingPipe,
        AccessibilityClickDirective,
        AccessibilityRouteDirective,
        FieldErrorDisplayComponent,
        MapToIterablePipe,
        HasAccessDirective,
        ProductModalComponent,
        ProductModalSearchComponent
    ],
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
    ],
    exports: [
        TableHeaderComponent,
        ScrollDirective,
        FileSizePipe,
        TimeRemianingPipe,
        AccessibilityClickDirective,
        AccessibilityRouteDirective,
        TableDetailsWindowComponent,
        TimeRemianingPipe,
        FieldErrorDisplayComponent,
        MapToIterablePipe,
        HasAccessDirective,
        ProductModalComponent,
        ProductModalSearchComponent
    ],
    providers: [
        TableDetailsWindowEventService
    ]
})
export class SharedModule { }
