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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PointTableComponent,
    UserDialogComponent,
    ValidationMsgComponent
  ],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAkXP_tDYuOJ2-k5etLKnEq_zdYTxBxlWs",
      authDomain: "iot---js.firebaseapp.com",
      databaseURL: "https://iot---js-default-rtdb.firebaseio.com",
      projectId: "iot---js",
      storageBucket: "iot---js.appspot.com",
      messagingSenderId: "825513689168",
      appId: "1:825513689168:web:e9751cccf05343ef7f5155"
    }),
    AngularFireDatabaseModule,
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
