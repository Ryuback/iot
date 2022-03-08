/* eslint-disable */
// @ts-nocheck

import {Observable, Subject} from 'rxjs';
import {share} from 'rxjs/operators';
import * as nanomemoize from 'nano-memoize';

function _watchMethods(target: any, ...methodsName: string[]): Observable<[string, ...any[]]> {
  const methodCall$ = new Subject<[string, ...any[]]>();
  if (target) {
    methodsName.forEach(method => {
      if (target[method]) {
        const oldFn = target[method].bind(target);
        target[method] = (...params) => {
          oldFn(...params);
          methodCall$.next([method, ...params]);
        };
      }
    });
  }
  return methodCall$.pipe(share());
}

// Same as @Memoize()
export const watchMethods = (nanomemoize as ((any) =>
  ((target: any, ...methodsName: string[]) => Observable<[string, ...any[]]>)))(_watchMethods);
