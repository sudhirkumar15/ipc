import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations: [
        PhoneNumberComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        PhoneNumberComponent
    ]
})
export class ControlsModule { }
