import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  imports: [
    // make this empty
    ],
  declarations: [],
  exports: [
    CommonModule,
    CalendarModule
  ]
})

export class SharedModule {}
