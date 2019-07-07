import { Component, OnInit } from '@angular/core';
import {TeachingarrangeService,Arrange} from "../../shared/teachingarrange.service";
import {LocalstorageService} from "../../services/localstorage.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-teachingdetail',
  templateUrl: './teachingdetail.component.html',
  styleUrls: ['./teachingdetail.component.scss']
})
export class TeachingdetailComponent implements OnInit {

  public arrangeId:number;
  public arrange:Arrange;
  public course_id: string;
  public place_id1: string;
  public place_name:string;
  public course_name:string;
  public course_time:string;
  public course_score:string;
  public course_single_double:string;
  public course_day:string;
  public class_scope:string;
  public course_towho:string;
  public class_weekscope:string;
  constructor(private routerInfo:ActivatedRoute,private storage:LocalstorageService) { }

  ngOnInit() {
    this.arrangeId=this.routerInfo.snapshot.params['id'];
    console.log(this.arrangeId);
    this.arrange=this.storage.getItem('arrange').find(key=>key.record_id1==this.arrangeId);
    console.log(this.arrange);
    this.course_id=this.arrange.course_id;
    this.place_id1=this.arrange.place_id1;
    this.place_name=this.arrange.place_name;
    this.course_name=this.arrange.course_name;
    this.course_time=this.arrange.course_time;
    this.course_score=this.arrange.course_score;
    this.course_single_double=this.arrange.course_single_double;
    this.course_day=this.arrange.course_day;
    this.class_scope=this.arrange.class_scope;
    this.course_towho=this.arrange.course_towho;
    this.class_weekscope=this.arrange.class_weekscope;
  }

}
