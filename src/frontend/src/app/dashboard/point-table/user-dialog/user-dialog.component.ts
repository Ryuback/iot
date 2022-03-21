import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Message} from "primeng/api";
import {AppMessageService} from "../../../utils/app-message-service";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {

  $RFID: AngularFireList<unknown>

  form: FormGroup = this.fb.group({
    fullName: [null, Validators.required],
    nickname: [null, Validators.required],
    type: ['Professor'],
    rfid: ['']
  });

  loadingRFID = false;
  msgs: Message;

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              public ref: DynamicDialogRef,
              private messageService: AppMessageService) {
    this.$RFID = this.db.list('RFID_entries');
  }

  ngOnInit(): void {
    this.$RFID.snapshotChanges()
      .pipe(
        tap(async (update) => {
          if (this.loadingRFID) {
            const rfid = update[0].payload.val();
            // console.log(rfid);
            if (rfid) {
              console.log(rfid);
              this.form.patchValue({
                rfid: rfid
              });
              this.loadingRFID = false;
              // console.log(this.form.value);
              const res = await this.db.database.ref('Users').get();
              if (res.val()) {
                const users = Object.values(res.val());
                // console.log(users)
                // @ts-ignore
                const refidInUse = users.find((u) => u.rfid === this.form.value.rfid);
                if (refidInUse) {
                  console.error("ESSE ID JA ESTA CADASTRADO")
                  this.messageService.addError("Esse cartão já restá cadastrado.");
                } else {
                  console.log(100000000)
                  console.log(this.form.value)
                  await this.db.database.ref('Users').child(this.form.value.rfid).set(this.form.value);
                  this.messageService.addSuccess("Cadastrado com sucesso.");
                }
              } else {
                console.log(100000000)
                console.log(this.form.value)
                await this.db.database.ref('Users').child(this.form.value.rfid).set(this.form.value);
                this.messageService.addSuccess("Cadastrado com sucesso.");
              }
              this.ref.close();
            }
          }
        })
      )
      .subscribe()
  }

  submit() {
    console.log("#submit")
    if (this.form.valid) {
      this.loadingRFID = true;
    }
  }
}
