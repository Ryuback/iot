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
import {ValidationMsgComponent} from './shared/validation-msg/validation-msg.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {PortaComponent} from './porta/porta.component';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PointTableComponent,
    UserDialogComponent,
    ValidationMsgComponent,
    PortaComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.key),
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CardModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
