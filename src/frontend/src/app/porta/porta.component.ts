import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-porta',
  templateUrl: './porta.component.html',
  styleUrls: ['./porta.component.scss']
})
export class PortaComponent implements OnInit {

  status: boolean;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.db.list('servo').valueChanges().subscribe(value => {
      const servoStatus = value[0];
      console.log(servoStatus)
      servoStatus === "on" ? this.status = true : this.status = false;
    });
  }

  async changeStatus() {
    this.status = !this.status;
    await this.db.database.ref('servo').child('estado').set(this.status ? 'on' : 'off');
  }
}
