import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from "../../services/localstorage.service";
import {Http,URLSearchParams, } from "@angular/http";
import {Major} from "../../shared/major.service";

@Component({
  selector: 'app-majoredit',
  templateUrl: './majoredit.component.html',
  styleUrls: ['./majoredit.component.scss']
})
export class MajoreditComponent implements OnInit {

  private majors:Array<Major>;
  public majorId:string;
  public id1:string;
  public major:Major;
  public name:string='';
  public collegeId:string='';
  public collegename:string='';
  constructor(private routerInfo:ActivatedRoute,private router:Router,private storage:LocalstorageService,public http:Http) { }

  ngOnInit() {
    this.majorId=this.routerInfo.snapshot.params['id'];
    console.log(this.majorId);
    if(this.majorId!='-1')
    {
      this.http.get('/login/SelectMajor').map(res=>res.json()).subscribe(data => {
          this.majors = data['data'];
          console.log(data);
          this.major=this.majors.find(key=>key.id==this.majorId);
          console.log(this.major);
          this.id1=this.major.id;
          this.name=this.major.name;
          this.collegeId=this.major.collegeId;
          this.collegename=this.major.collegename;
        }
      );
    }
  }

  cancel(){
    this.router.navigate(['/test/major']);
  }
  save(){
    //this.router.navigateByUrl('/student');
    if(this.majorId=='-1')
    {
      let d1=new URLSearchParams();
      d1.append('id',this.id1);
      d1.append('name',this.name);
      d1.append('collegeId',this.collegeId);
      d1.append('collegename',this.collegename);
      this.http.post('/login/AddMajor',d1)
        .map(res => res.json()).subscribe(function (data) {
        //alert(JSON.stringify(data));
      })
    }
    else
    {
      //修改
      let d1=new URLSearchParams();
      d1.append('id',this.id1);
      d1.append('name',this.name);
      d1.append('collegeId',this.collegeId);
      d1.append('collegename',this.collegename);
      this.http.post('/login/UpdateMajor',d1)
        .map(res => res.json()).subscribe(function (data) {
        //alert(JSON.stringify(data));
      })

    }
    alert("保存成功！")
  }

}
