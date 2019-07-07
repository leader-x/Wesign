import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {LocalstorageService} from '../services/localstorage.service';
import {Observable} from 'rxjs';
import {New, TestService} from '../shared/test.service';
import {Http, RequestOptions, Headers, URLSearchParams, HttpModule  } from '@angular/http';
import {HttpRequestService} from '../services/http-request.service';
//import {RequestOptions} from "@angular/http";

@Component({
  selector: 'app-usermessage',
  templateUrl: './usermessage.component.html',
  styleUrls: ['./usermessage.component.scss']
})
export class UsermessageComponent implements OnInit {
  private users: Array<User>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<User>;
  sortName = null;
  sortValue = null;

  panels = [
    {
      active: false,
      disable: false,
      name  : '高级搜索'
    }
  ];

  constructor(public router: Router, private newService: TestService, public http: Http, public httprequestService: HttpRequestService) { }

  ngOnInit() {

    this.http.get('/login/LoginServlet').map(res => res.json()).subscribe(data => {
        this.users = data['data'];
        console.log(data);
        this.displayData = [ ...this.users];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.users];
      }
    );
  }

  create() {
    this.router.navigateByUrl('/test/user/-1');
  }
  update(user: User, key) {
    this.router.navigateByUrl('/test/user/' + key);
  }
  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('id', key);
    this.http.post('/login/Delete', d1)
      .map(res => res.json()).subscribe(function (data) {
    //  alert(JSON.stringify(data));
      this.users = data['data'];
      this.displayData = [ ...this.users];
    });
  }

  Refresh() {
    this.http.get('/login/LoginServlet').map(res => res.json()).subscribe(data => {
        this.users = data['data'];
        console.log('data   ', data);
        this.displayData = [ ...this.users];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.users];
      }
    );
  }

  //////////////////////////////////////
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();

  }


  search(): void {

    /** sort data **/
    if (this.sortName) {
      this.displayData = this.users.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.users;
      this.displayData = this.users;
    }
    this.displayData = [ ...this.users];
  }
}
