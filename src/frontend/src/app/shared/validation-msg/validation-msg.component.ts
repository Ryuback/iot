import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {merge, Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {watchMethods} from "../../utils/watch-methods";

interface ViewData {
  message: string;
  class: string;
}

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMsgComponent implements OnChanges, OnDestroy {

  private static readonly METHODS_TO_WATCH = ['enable', 'disable', 'markAsTouched', 'markAllAsTouched',
    'markAsUntouched', 'markAsPristine', 'markAsDirty', 'updateValueAndValidity'];

  // Custom messages
  @Input() level: 'info' | 'warn' | 'error' = 'error';
  @Input() label: string;
  @Input() message: string;
  @Input() class = '';
  @Input() debugId = '';

  // Form validation messages
  @Input() control: AbstractControl | null;
  @Input() showOnlyFirstMessage: boolean | string = true;

  messageList: ViewData[];
  changes: Subscription | undefined;
  currentState: any = {
    errors: null,
    touched: false,
    dirty: false,
    disabled: false
  };

  constructor(private cdr: ChangeDetectorRef) {
  }

  // @log()
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.debugId) {
      console.log('#> ValidationMsgComponent.ngOnChanges', this.debugId, this.control);
    }
    this.reconfigure();
  }

  private reconfigure() {
    this.messageList = [];
    if (this.changes) {
      this.changes.unsubscribe();
      this.changes = undefined;
    }

    if (this.message) {
      this.createSingleMessage();

    } else if (this.control) {
      this.changes = merge(this.control.statusChanges, watchMethods(this.control, ...ValidationMsgComponent.METHODS_TO_WATCH))
        .pipe(startWith('Init'))
        .subscribe(event => {
          if (this.debugId) {
            console.log('#> ValidationMsgComponent.event', this.debugId, event);
          }
          if (this.shouldReRender()) {
            this.messageList = [];
            if (this.control?.enabled && this.control?.errors && (this.control?.touched || this.control?.dirty)) {
              this.createValidationMessages();
            }
            this.cdr.markForCheck();
          }
        });
    }
  }

  private shouldReRender() {
    const isDifferent = this.currentState.errors !== this.control?.errors
      || this.currentState.touched !== this.control?.touched
      || this.currentState.dirty !== this.control?.dirty
      || this.currentState.disabled !== this.control?.disabled;
    if (isDifferent) {
      this.currentState.errors = this.control?.errors;
      this.currentState.touched = this.control?.touched;
      this.currentState.dirty = this.control?.dirty;
      this.currentState.disabled = this.control?.disabled;
    }
    return isDifferent;
  }

  private createSingleMessage(): void {
    const msg = {
      class: this.level,
      message: (this.label) ? (this.label + ': ' + this.message) : (this.message)
    } as ViewData;
    this.messageList.push(msg);
  }

  private createValidationMessages(): void {
    const errors = this.control?.errors || {};
    const errorsKeys = Object.keys(errors);
    for (const key of errorsKeys) {
      let value = errors[key];
      if (typeof value !== 'object') {
        value = {value};
      }
      let msg: string;
      if (key === 'required') {
        msg = 'Campo obrigatório *'
      }
      const formattedMessage = msg;
      const displayMsg = {
        class: 'error',
        message: this.label ? (this.label + ': ' + formattedMessage) : formattedMessage
      } as ViewData;
      this.messageList.push(displayMsg);
      if (this.showOnlyFirstMessage === 'true' || this.showOnlyFirstMessage === true) {
        break;
      }
    }
    this.removeDuplicateMessages();
  }

  private removeDuplicateMessages() {
    const generateId = (msg: ViewData) => msg.message + msg.class;
    const arr = this.messageList;
    this.messageList = [...new Map(arr.map(msg => [generateId(msg), msg])).values()];
  }

  ngOnDestroy() {
    if (this.changes) {
      this.changes.unsubscribe();
    }
  }

}
