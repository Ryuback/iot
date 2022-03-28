import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Subscription} from "rxjs";
import {User} from "../../models/User.model";
import {AppMessageService} from "../../utils/app-message-service";

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

  $RFID: Subscription;
  userTable = this.db.database.ref('Users');
  pointTable = this.db.database.ref('Point');
  readingStatus: 'READING' | 'WAITING' = "READING"

  points = []

  constructor(private dialogService: DialogService,
              private db: AngularFireDatabase,
              private cdr: ChangeDetectorRef,
              private messageService: AppMessageService) {
    this.userObservable();
    this.db.list('Point').valueChanges().subscribe(value => {
      console.log(value);
      this.points = value as any[];
      this.cdr.detectChanges();
    });
  }


  private userObservable() {
    this.$RFID = this.db.list('RFID_entries').valueChanges().subscribe(async (v) => {
        const rfid = v.filter(data => data !== "")[0] as string;
        if (rfid) {
          console.log(rfid);
          const user = (await this.userTable.child(rfid).get()).val() as User;
          console.log(user);
          if (!user) {
            return this.messageService.addWarn("Esse cartão não está vinculado a nenhum usuário.");
          }
          const pTableAll = ((await this.pointTable.get()).val()) ? Object.values((await this.pointTable.get()).val()) as any[] : [];

          if (pTableAll == undefined || pTableAll.length === 0) {
            console.log('#INSERIR')
            this.pointTable.push({
              rfid: rfid,
              name: user.fullName,
              type: user.type,
              entryType: 'ENTRADA',
              time: new Date().toString()
            })
          } else {
            // console.log('TABLE: ', pTableAll)
            const userFilter = pTableAll.filter(v => v.rfid === rfid);
            // console.log('FILTER: ', userFilter)
            // console.log(userFilter.length - 1)
            const lastData = userFilter[userFilter.length - 1];
            // console.log(lastData)
            if (lastData) {
              this.pointTable.push({
                rfid: rfid,
                name: user.fullName,
                type: user.type,
                entryType: lastData.entryType === 'ENTRADA' ? 'SAIDA' : 'ENTRADA',
                time: new Date().toString()
              });
            } else {
              this.pointTable.push({
                rfid: rfid,
                name: user.fullName,
                type: user.type,
                entryType: 'ENTRADA',
                time: new Date().toString()
              });
            }
          }
        }
      }
    )
  }

  ngOnInit(): void {
  }

  openUserDialog() {
    this.readingStatus = 'WAITING';
    this.$RFID.unsubscribe();
    const ref = this.dialogService.open(UserDialogComponent, {
      header: 'User',
      width: '40%'
    });
    ref.onClose.subscribe(() => {
      console.log('#ONCLOSE')
      this.readingStatus = 'READING';
      this.userObservable();
      this.cdr.detectChanges();
    })
  }
}
