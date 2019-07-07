import { Injectable } from '@angular/core';

@Injectable()
export class LeaveService {

  constructor() { }

}
export class Leave {
  constructor(public record_id: string,
              public course_id: string,
              public course_name: string,
              public student_id: string,
              public student_name: string,
              public leave_reason: string ) {
  }
}
