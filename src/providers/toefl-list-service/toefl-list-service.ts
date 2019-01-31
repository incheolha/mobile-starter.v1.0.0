import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CacheService } from 'ionic-cache';

import { Subject } from 'rxjs/Subject';
import { Toefl } from '../../pages/model/toefl-model/toefl.model';
import { globalConstants } from '../../app/globalConstantsSetting/globalConstants';
import { UtiltiyServiceProvider } from '../utiltiy-service/utiltiy-service';

@Injectable()
export class ToeflListServiceProvider {

  toeflLists: Observable<Toefl[]>;
  toeflListsKey = 'toefl-lists';
  public toeflListChanged = new Subject<Toefl[]>();

  constructor( public http: HttpClient,
               private utilityService: UtiltiyServiceProvider,
               private cache: CacheService )
               {
                  console.log('Hello ToeflListServiceProvider Provider');
              }

  postToeflListsListener() {
    return this.toeflListChanged.asObservable();
  }

  getAllToeflLists(refresher?) {

    let URL = globalConstants.httpURL + '/showExam';
    let toeflListRequest = this.http.get<{ message: string, toefls: Toefl[]}>(URL)
                           .pipe(
                                   map( (result ) => {
                                    const msg = 'New ToeflLists from API loaded.';
                                    const timeLenth = '2000';
                                    const location = 'bottom';
                                    const cssClassName = 'aptRequestToast';
                                    this.utilityService.customToast(msg, timeLenth, location, cssClassName);
                                    return result.toefls;
                                   })
                           )

          let ttl = (60 * 60 * 24);

          if(refresher) {
            let delayType = 'all';
            this.cache.loadFromDelayedObservable( URL, toeflListRequest, this.toeflListsKey, ttl, delayType)
                      .subscribe( data => {
                        console.log('server data ', data);
                        this.toeflListChanged.next( data );
                        refresher.complete()
                      })
          } else {
            this.cache.loadFromObservable( URL, toeflListRequest, this.toeflListsKey, ttl)
                      .subscribe( data => {
                        console.log('저장된 cache 정보로 부터', data );
                        this.toeflListChanged.next( data );
                      })
          }

  }

  cacheInvalidateService() {
    this.cache.clearGroup(this.toeflListsKey);
  }

  forceToReresher(refresher) {
    this.getAllToeflLists(refresher);
  }
}
