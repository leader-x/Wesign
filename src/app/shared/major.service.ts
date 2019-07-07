import { Injectable } from '@angular/core';

@Injectable()
export class MajorService {

  constructor() { }

}
export class Major {
  constructor(public id: string,
              public name: string,
              public collegeId: string,
              public collegename: string) {
  }
}
