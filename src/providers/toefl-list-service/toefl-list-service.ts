import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Toefl } from '../../pages/model/toefl.model';


@Injectable()
export class ToeflListServiceProvider {

  private toefls: Toefl[] = [];

  constructor( public http: Http ) {
    console.log('Hello ToeflListServiceProvider Provider');
  }
  getAllToeflLists() {
    return this.http.get('http://192.168.1.35:3000/showExam')
                                                      .do((res: Response) => console.log(res))
                                                      .map((res: Response) => res.json())
                                                      .catch(this.catchError);

  }

catchError( error: Response | any) {
    console.log(error);
    return Observable.throw( error.json().error || 'Server Error');
  }

}
