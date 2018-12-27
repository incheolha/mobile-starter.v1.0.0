
export class User {

  constructor( public email: string,
               public password: string,
               public name?: string,
               public permissionTag?: string,
               public created_at?: Date,
               public update_at?: Date,
               public toeflId?: string,
               public paymentId?: string,
               public paidToeflLists?:  [
                                          {
                                            examNo: number,
                                            examLevel: string,
                                            examPrice: number
                                          }
                                        ],
               public shoppingCartLists?: [
                                            {
                                              examNo: number,
                                              examLevel: string,
                                              examPrice: number
                                            }
                                          ],
               public wishLists?: [
                                    {
                                      examNo: number,
                                      examLevel: string,
                                      examPrice: number
                                    }
                                  ],
               public provider?: string,
               public authToken?: string,
               public facebook?: string,
               public google?: string ) {}
}
