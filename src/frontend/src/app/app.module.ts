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
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDqbr3hbDP3yJfNoij-VtgyswtQpf9IcPA",
      authDomain: "tranca-40953.firebaseapp.com",
      projectId: "tranca-40953",
      storageBucket: "tranca-40953.appspot.com",
      messagingSenderId: "656788157614",
      appId: "1:656788157614:web:fd7633599b3bcde027a93f",
      measurementId: "G-3KGNCY9CCB"
      //----------------------------------
      // apiKey: "AIzaSyAkXP_tDYuOJ2-k5etLKnEq_zdYTxBxlWs",
      // authDomain: "iot---js.firebaseapp.com",
      // databaseURL: "https://iot---js-default-rtdb.firebaseio.com",
      // projectId: "iot---js",
      // storageBucket: "iot---js.appspot.com",
      // messagingSenderId: "825513689168",
      // appId: "1:825513689168:web:e9751cccf05343ef7f5155"
    }),
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
