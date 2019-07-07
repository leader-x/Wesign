import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentService {

  constructor() { }

}
export class Department {
  constructor(public id: string,
              public name: string,
              public studentCount: string,
              public teacherCount: string)
  {

  }
}
