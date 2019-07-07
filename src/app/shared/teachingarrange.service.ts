import { Injectable } from '@angular/core';

@Injectable()
export class TeachingarrangeService {

  constructor() { }

  /*private arrangers: Arrange[] = [
    new Arrange(1,'软件工程实训','张老师', '全周', 1, 12,'星期四', '上午',3,4,"数计楼3号101",'17计算机'),
    new Arrange(2,'计算机工程实训','张老师', '单周', 1, 18, '星期五','上午',1,4,"数计楼3号101",'17计算机'),
    new Arrange(3,'云计算','张老师', '双周', 1, 18, '星期二','下午',7,8,"数计楼3号101",'17计算机'),
    new Arrange(4,'智能技术','张老师', '全周', 1,18, '星期三','下午',5,8,"数计楼3号101",'17计算机'),
    new Arrange(5,'工程英语','张老师', '双周', 1, 18, '星期一','下午',5,6,"数计楼3号101",'17计算机')
  ];

  getArranges(): Arrange[] {
    return this.arrangers;
  }
  getArrange(id: number): Arrange {
    var arranger =this.arrangers.find(arranger => arranger.id ==id);;
    if(!arranger){
      arranger =new Arrange(0, '', '', '', 0, 0, '','',0,0,'','');
    }
    return arranger;
  }*/
}

export class Arrange {
  constructor(public record_id1:string,
              public course_id: string,
              public place_id1: string,
              public place_name:string,
              public course_name:string,
              public course_time:string,
              public course_score:string,
              public course_single_double:string,
              public course_day:string,
              public class_scope:string,
              public course_towho:string,
              public class_weekscope:string){

  }
}
