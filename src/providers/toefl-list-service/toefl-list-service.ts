import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Toefl } from '../../pages/model/toefl.model';


@Injectable()
export class ToeflListServiceProvider {

  private toefls: Toefl[] = [];
  public toeflListChanged = new Subject<Toefl[]>();

  constructor( public http: Http ) {
    console.log('Hello ToeflListServiceProvider Provider');
  }

  getAllToeflLists() {
    this.http.get('http://192.168.1.35:3000/showExam')
                                                      .subscribe(
                                                        ( res: Response ) => {
                                                          console.log(res);
                                                          const data = res.json();
                                                          console.log(data);
                                                          this.toefls.splice(0);

                                                          for (const toeflItem of data.toefls ) {
                                                            this.toefls.push(toeflItem);
                                                          }
                                                          console.log(this.toefls.slice());
                                                        },
                                                        ( error ) => console.log( error )
                                                      );
      return this.toefls.slice();
  }

}
