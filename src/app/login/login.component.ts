import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';
import {User} from '../shared/user.service';
//import 'rxjs/Rx';
import {Http, RequestOptions, Headers, URLSearchParams, HttpModule  } from '@angular/http';
import {HttpRequestService} from '../services/http-request.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public time: number;
  public role: number;
  public password: string;
  validateForm: FormGroup;
  public userName: string;
  public users: Array<User>;
  public keyarray: string;
  dateTime: Date;
  constructor(public datePipe: DatePipe, public http: Http, private fb: FormBuilder, public router: Router, private storage: LocalstorageService, public userService: UserService) {

  }

  ngOnInit() {
    this.dateTime = new Date(); //  获取当前日期
    console.log(this.datePipe.transform(this.dateTime, 'yyyy-MM-dd'));
    console.log(this.dateTime.toDateString());
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });

  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }


  toWelcome() {
    this.time = 0;
    const d1 = new URLSearchParams();
    d1.append('username', this.userName);
    d1.append('password', this.password);
    this.http.post('/login/LoginJudge', d1)
      .map(res => res.json()).subscribe(data => {
      //alert(JSON.stringify(data));
      console.log(data['data']);
      this.users = data['data'];
      console.log(this.users);
      //this.keyarray=data['data'][0].keys;
      //console.log(this.users);
      //console.log("取key"+this.keyarray);
      if (data['data'] == '') {
        alert('用户名或者密码不正确');
      } else {
        //console.log(this.users[0].role);
        if (this.storage.getItem('data')  !=  '') {
          this.storage.removeItem('data');
        }
        this.storage.setItem('data', data['data'][0]);
        alert('欢迎系统' + this.users[0].rolename + '登录,进入主页后请进行刷新！');
        //this.router.navigateByUrl('/test/welcome',{queryParams:{'username':this.userName,'password':this.password}});
        this.router.navigateByUrl('/test/welcome');
        this.time = this.time + 2;
    }

    });
  }


}
