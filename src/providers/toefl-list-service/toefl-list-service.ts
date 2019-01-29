import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { Toefl } from '../../pages/model/toefl-model/toefl.model';
import { globalConstants } from '../../app/globalConstantsSetting/globalConstants';

@Injectable()
export class ToeflListServiceProvider {

  public toeflListChanged = new Subject<Toefl[]>();

  constructor( public http: HttpClient ) {
    console.log('Hello ToeflListServiceProvider Provider');
  }

  postToeflListsListener() {
    return this.toeflListChanged.asObservable();
  }

  getAllToeflLists() {
    return this.http.get<{ message: string, toefls: Toefl[]}>(globalConstants.httpURL +  '/showExam');

  }

// 구버젼 rxjs를 사용하여 정보를 가져오는방법
  // getAllToeflLists() {
  //   return this.http.get(globalConstants.httpURL +  '/showExam')
  //                                                     .do((res: Response) => console.log(res))
  //                                                     .map((res: Response) => res.json())
  //                                                     .catch(this.catchError);

  // }
}
