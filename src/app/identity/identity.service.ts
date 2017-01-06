/**
 Copyright 2017 Airbus DS GEO S.A.

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Identity} from "./identity.interface";
import 'rxjs/add/operator/map';

@Injectable()
export class IdentityService {

  endpoint: string = 'https://view.geoapi-airbusds.com/api/v1/me?validatetoken=true';

  constructor(private http: Http) {}

  findMe(token: string): Observable<Identity> {

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', `Bearer ${token}`);

    return this.http
      .get(this.endpoint, new RequestOptions({ headers }))
      .map(r => r.json() as Identity);
  }

}
