import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";

class Potentiometer {
  value: number;
}

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class PointTableComponent implements OnInit {

  products = [
    {code: 1, name: 'Yago', category: 'Studant', quantity: 5}
  ]

  constructor(private dialogService: DialogService) {
  }


  ngOnInit(): void {
  }

  openUserDialog() {
    const ref = this.dialogService.open(UserDialogComponent, {
      header: 'User',
      width: '40%'
    });
  }
}
