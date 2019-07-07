import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from '../../services/localstorage.service';
import {Http, URLSearchParams, } from '@angular/http';
import {Department} from '../../shared/department.service';

@Component({
  selector: 'app-departmentedit',
  templateUrl: './departmentedit.component.html',
  styleUrls: ['./departmentedit.component.scss']
})
export class DepartmenteditComponent implements OnInit {

  private colleges: Array<Department>;
  public collegeId: string;
  public id1: string;
  public college: Department;
  public name = '';
  public studentCount = '';
  public teacherCount = '';
  constructor(private routerInfo: ActivatedRoute, private router: Router, private storage: LocalstorageService, public http: Http) {
  }

  ngOnInit() {
    this.collegeId = this.routerInfo.snapshot.params['id'];
    console.log(this.collegeId);
    if (this.collegeId != '-1') {
      this.http.get('/login/SelectCollege').map(res => res.json()).subscribe(data => {
          this.colleges = data['data'];
          console.log(data);
          this.college = this.colleges.find(key => key.id == this.collegeId);
          console.log(this.college);
          this.id1 = this.college.id;
          this.name = this.college.name;
          this.studentCount = this.college.studentCount;
          this.teacherCount = this.college.teacherCount;
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/test/department']);
  }
  save() {
    //this.router.navigateByUrl('/student');
    if (this.collegeId == '-1') {
      const d1 = new URLSearchParams();
      d1.append('id', this.id1);
      d1.append('name', this.name);
      d1.append('studentCount', this.studentCount);
      d1.append('teacherCount', this.teacherCount);
      this.http.post('/login/AddCollege', d1)
        .map(res => res.json()).subscribe(function (data) {
       // alert(JSON.stringify(data));
      });
    } else {
      //修改
      const d1 = new URLSearchParams();
      d1.append('id', this.id1);
      d1.append('name', this.name);
      d1.append('studentCount', this.studentCount);
      d1.append('teacherCount', this.teacherCount);
      this.http.post('/login/UpdateCollege', d1)
        .map(res => res.json()).subscribe(function (data) {
      //  alert(JSON.stringify(data));
      });

    }
    alert('保存成功！');
  }

}
