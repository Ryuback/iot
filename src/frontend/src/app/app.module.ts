import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared-module";
import {DashboardComponent} from './dashboard/dashboard.component';
import {PointTableComponent} from './dashboard/point-table/point-table.component';
import {CardModule} from "primeng/card";
import {UserDialogComponent} from './dashboard/point-table/user-dialog/user-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ValidationMsgComponent } from './shared/validation-msg/validation-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PointTableComponent,
    UserDialogComponent,
    ValidationMsgComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
