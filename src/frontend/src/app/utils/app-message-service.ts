import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng/api/message';

export type Severity = 'error' | 'warn' | 'info' | 'success';


@Injectable({
  providedIn: 'root',
})
export class AppMessageService {

  constructor(private primeMessageService: MessageService) {
  }

  add(primeMessage: Message) {
    this.primeMessageService.add(primeMessage);
  }

  addError(message: string, life?: number, key?: string) {
    this._calcLifeTimeAndAdd('error', message, life, key);
  }

  addWarn(message: string, life?: number, key?: string) {
    this._calcLifeTimeAndAdd('warn', message, life, key);
  }

  addInfo(message: string, life?: number, key?: string) {
    this._calcLifeTimeAndAdd('info', message, life, key);
  }

  addSuccess(message: string, life?: number, key?: string) {
    this._calcLifeTimeAndAdd('success', message, life, key);
  }

  private _calcLifeTimeAndAdd(severity: Severity, message: string, life?: number, key?: string) {
    const lifeTime = life ? life : (3000 + message.split(' ').filter(word => word.length >= 3).length * 400);
    console.log('#> AppMessageService.lifeTime', life === 0 ? 'stick' : lifeTime);
    let summary = undefined;
    let detail = undefined;
    if (message.indexOf('\n') >= 0) {
      [summary, detail] = message.replace('\n\n', '\n').split('\n');

    } else if (message.indexOf('<br>') >= 0) {
      [summary, detail] = message.replace('<br><br>', '\n').split('\n');

    } else if (message.indexOf('<br/>') >= 0) {
      [summary, detail] = message.replace('<br/><br/>', '\n').split('\n');

    } else {
      detail = message;
    }
    this.primeMessageService.add({
      key,
      severity: severity,
      summary,
      detail,
      sticky: life === 0,
      life: lifeTime
    });
  }

  clear(key?: string) {
    this.primeMessageService.clear(key);
  }

}
