import { Injectable } from '@angular/core';

@Injectable()
export class CourseService {

  constructor() { }

}

export class Course {
  constructor(public record_id:string,
              public course_id: string,
              public course_name: string,
              public teacher_id: string,
              public teacher_name: string) {

  }
}
