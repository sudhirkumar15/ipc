import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorService } from './service/error.service';
import { GlobalErrorHandler } from './service/global-error-handler';
import { FormComponent } from './form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthInterceptor } from './service/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DataTableModule } from './data-table/data-table.module';
import { ControlsModule } from './controls/controls.module';
import { SharedModule } from './shared/shared.module';
import { AppFormModule } from './form/app-form.module';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './service/auth-guard.service';
import { UploadComponent } from './core/upload-window/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    CoreModule,
    ControlsModule,
    SharedModule,
    AppFormModule,
    DataTableModule
  ],
  entryComponents: [UploadComponent],
  providers: [
    AuthGuardService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
