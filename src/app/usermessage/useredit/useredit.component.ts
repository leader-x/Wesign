import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User,UserService} from "../../shared/user.service";
import {LocalstorageService} from "../../services/localstorage.service";
import {Http,RequestOptions,Headers,URLSearchParams,HttpModule  } from "@angular/http";

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.scss']
})
export class UsereditComponent implements OnInit {

  private users:Array<User>;
  public userId:string;
  public user:User;
  public username:string;
  public role:string;
  public rolename:string;
  public password:string;
  public id:string;
  constructor(private routerInfo:ActivatedRoute ,private userService:UserService,
              private router:Router,private storage:LocalstorageService,public http:Http) { }

  ngOnInit() {
    this.userId=this.routerInfo.snapshot.params['id'];
    console.log(this.userId);
    if(this.userId!='-1')
    {
      this.http.get('/login/LoginServlet').map(res=>res.json()).subscribe(data => {
          this.users = data['data'];
          console.log(data);
          this.user=this.users.find(key=>key.id==this.userId);
          console.log(this.user);
          this.id=this.user.id;
          this.username=this.user.name;
          this.role=this.user.role;
          this.rolename=this.user.rolename;
          this.password=this.user.password;
        }
      );
    }
  }
  cancel(){
    this.router.navigate(['/test/user']);
  }
  save(){
    if(this.userId=='-1')
    {
      console.log(this.username);
      let d1=new URLSearchParams();
      d1.append('id',this.id);
      d1.append('username',this.username);
      d1.append('role',this.role);
      d1.append('rolename',this.rolename);
      d1.append('password',this.password);
      this.http.post('/login/Add',d1)
        .map(res => res.json()).subscribe(function (data) {
       // alert(JSON.stringify(data));
      })
    }
    else
    {
      //修改
      let d1=new URLSearchParams();
      d1.append('id',this.id);
      d1.append('username',this.username);
      d1.append('role',this.role);
      d1.append('rolename',this.rolename);
      d1.append('password',this.password);
      this.http.post('/login/Update',d1)
        .map(res => res.json()).subscribe(function (data) {
      //  alert(JSON.stringify(data));
      })

    }

    alert("保存成功！")

  }

}
