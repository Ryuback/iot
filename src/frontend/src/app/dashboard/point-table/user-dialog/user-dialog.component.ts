import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
  form: FormGroup = this.fb.group({
    fullName: [null, Validators.required],
    nickname: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.valid)
    console.log(this.form.value)
  }
}
