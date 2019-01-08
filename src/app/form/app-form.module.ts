import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComponent } from './form.component';
@NgModule({
    declarations: [
        FormComponent
    ],
    exports: [
        CommonModule,
        FormComponent
    ]
})
export class AppFormModule { }
