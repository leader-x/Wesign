import { Component, OnInit } from '@angular/core';
import {TeacherService,Teacher} from "../../shared/teacher.service";
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from "../../services/localstorage.service";
import {Http,RequestOptions,Headers,URLSearchParams,HttpModule  } from "@angular/http";

@Component({
  selector: 'app-teacheredit',
  templateUrl: './teacheredit.component.html',
  styleUrls: ['./teacheredit.component.scss']
})
export class TeachereditComponent implements OnInit {

  private teachers:Array<Teacher>;
  public teacherId:string;
  public teacher:Teacher;
  public name:string='';
  public department:string='';
  public proTitle:string='';
  public radioValue = '女';
  public id:string;
  constructor(private routerInfo:ActivatedRoute ,private teacherService:TeacherService,
              private router:Router,private storage:LocalstorageService,public http:Http) { }

  ngOnInit() {
    this.teacherId=this.routerInfo.snapshot.params['id'];
    console.log(this.teacherId);
    if(this.teacherId!='-1')
    {
      this.http.get('/login/SelectTeacher').map(res=>res.json()).subscribe(data => {
          this.teachers = data['data'];
          console.log(data);
          this.teacher=this.teachers.find(key=>key.id==this.teacherId);
          console.log(this.teacher);
          this.id=this.teacher.id;
          this.department=this.teacher.department;
          this.name=this.teacher.name;
          this.proTitle=this.teacher.proTitle;
          this.radioValue=this.teacher.sex;
        }
      );
    }
  }

  cancel(){
    this.router.navigate(['/test/teacher']);
  }
  save(){
    if(this.teacherId=='-1')
    {
      let d1=new URLSearchParams();
      d1.append('id',this.id);
      d1.append('name',this.name);
      d1.append('sex',this.radioValue);
      d1.append('department',this.department);
      d1.append('proTitle',this.proTitle);
      this.http.post('/login/AddTeacher',d1)
        .map(res => res.json()).subscribe(function (data) {
      //  alert(JSON.stringify(data));
      })
    }
    else
    {
      //修改
      let d1=new URLSearchParams();
      d1.append('id',this.teacherId);
      d1.append('name',this.name);
      d1.append('sex',this.radioValue);
      d1.append('department',this.department);
      d1.append('proTitle',this.proTitle);
      this.http.post('/login/UpdateTeacher',d1)
        .map(res => res.json()).subscribe(function (data) {
       // alert(JSON.stringify(data));
      })

    }

    alert("保存成功！")

  }

}
