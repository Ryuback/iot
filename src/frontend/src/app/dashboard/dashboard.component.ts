import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {tap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @ViewChild('chart')
  private chart;

  data: any = {
    labels: [''],
    datasets: [
      {
        label: 'First Dataset',
        data: [1]
      }
    ]
  };

  constructor(private db: AngularFireDatabase,
              private cdr: ChangeDetectorRef) {
    this.db.list('potentiometer')
      .snapshotChanges()
      .pipe(
        tap(update => {
          const v = update[0].payload.val()
          console.log(update[0].payload.val());
          this.data.labels.push('');
          this.data.datasets[0].data.push(v);
          console.log(this.data)
          this.chart.refresh();
        })
      ).subscribe();
  }

  ngOnInit(): void {
  }

}
