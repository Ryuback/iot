import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CalendarModule} from "primeng/calendar";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  imports: [
    // make this empty
  ],
  declarations: [],
  exports: [
    CommonModule,
    CalendarModule,
    TableModule,
    InputTextModule,
    ChartModule
  ]
})

export class SharedModule {
}
