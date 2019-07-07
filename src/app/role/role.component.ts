import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RoleService} from '../shared/role.service';
import {Role} from '../shared/role.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {LocalstorageService} from '../services/localstorage.service';
import {Http, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  private roles: Array<Role>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<Role>;
  sortName = null;
  sortValue = null;
  panels = [
    {
      active: false,
      disable: false,
      name  : '高级搜索'
    }
  ];
  constructor(public http: Http, public router: Router, private roleService: RoleService, private storage: LocalstorageService) { }

  ngOnInit() {

    this.http.get('/login/SelectRole').map(res => res.json()).subscribe(data => {
        this.roles = data['data'];
        console.log(data);
        this.storage.setItem('role', data['data']);
        console.log(this.storage.getItem('role'));
        this.displayData = [ ...this.roles];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.roles];
      }
    );
  }

  create() {
    this.router.navigateByUrl('/test/role/-1');
  }
  update(role: Role, key) {
    this.router.navigateByUrl('/test/role/' + key);
  }

  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('id', key);
    this.http.post('/login/DeleteRole', d1)
      .map(res => res.json()).subscribe(function (data) {
     // alert(JSON.stringify(data));
      this.roles = data['data'];
      this.displayData = [ ...this.roles];
    });
  }

  Refresh() {
    this.http.get('/login/SelectRole').map(res => res.json()).subscribe(data => {
        this.roles = data['data'];
        console.log(data);
        this.displayData = [ ...this.roles];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.roles];
      });

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
      this.displayData = this.roles.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.roles;
      this.displayData = this.roles;
    }
    this.displayData = [ ...this.roles];
  }
}
