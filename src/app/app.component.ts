/**
 Copyright 2017 Airbus DS GEO S.A.

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

import {Component, OnInit} from '@angular/core';
import {IdentityService} from "./identity/identity.service";
import {FormControl} from "@angular/forms";
import {Identity, BackendError} from "./identity/identity.interface";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tokenControl = new FormControl();
  identity: Identity;
  tokenDecoded: any;
  error: any = null;

  constructor(private identityService: IdentityService) { }

  ngOnInit(): void {

    let valueChanges = this.tokenControl.valueChanges
      .debounceTime(500)
      .map(v => AppComponent.cleanValue(v))
      .do(() => this.resetValues());

    let identity$ = valueChanges
      .switchMap(v => {
        return this.identityService.findMe(v)
          .catch(x => {
            this.error = <BackendError> x.json();
            return Observable.of(null);
          });
      });

    let token$ = valueChanges
      .flatMap(v => {
        return Observable.of(JSON.parse(atob(v.split('.')[1])))
          .catch(e => {
            this.error = e;
            return Observable.of(null);
          });
      });

    Observable.combineLatest(identity$, token$)
      .subscribe(v => [this.identity, this.tokenDecoded] = v);

  }

  resetValues(): void {
    this.identity = null;
    this.error = null;
    this.tokenDecoded = null;
  }

  private static cleanValue(text: string) {
    return text.replace('Bearer', '').trim();
  }
}
