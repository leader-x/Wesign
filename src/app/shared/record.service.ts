import { Injectable } from '@angular/core';

@Injectable()
export class RecordService {

  constructor() { }

}
export class Record {
  constructor(public sign_stuId: string,
              public sign_stuName: string,
              public sign_stuSeat: string,
              public place_name: string,
              public sign_courseNamet: string,
              public teacher_name: string, ) {

  }
}
