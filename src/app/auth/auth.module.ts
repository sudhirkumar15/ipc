import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './home/signup/signup.component';
import { ControlsModule } from '../controls/controls.module';
import { HeaderComponent } from './header/header.component';
import { AuthApiService } from './service/auth-api.service';
import { AuthEventService } from './service/auth-event.service';
import { SharedModule } from '../shared/shared.module';
import { ValidatorService } from '@shared/service/validator.service';
@NgModule({
    declarations: [
        HomeComponent,
        SignupComponent,
        LoginComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        ControlsModule,
        SharedModule,
        RecaptchaModule.forRoot(),
    ],
    providers: [
        AuthApiService,
        AuthEventService,
        ValidatorService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
