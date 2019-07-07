import { Component, OnInit } from '@angular/core';
import {Department} from '../shared/department.service';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Http, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  private colleges: Array<Department>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<Department>;
  sortName = null;
  sortValue = null;
  panels = [
    {
      active: false,
      disable: false,
      name  : '高级搜索'
    }
  ];
  constructor(public http: Http, public router: Router, private storage: LocalstorageService) { }

  ngOnInit() {
    this.http.get('/login/SelectCollege').map(res => res.json()).subscribe(data => {
        this.colleges = data['data'];
        console.log(data);
        this.displayData = [ ...this.colleges];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.colleges];
      }
    );
  }

  create() {
    this.router.navigateByUrl('/test/department/-1');
  }
  update(college: Department, key) {
    this.router.navigateByUrl('/test/department/' + key);
  }
  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('id', key);
    this.http.post('/login/DeleteCollege', d1)
      .map(res => res.json()).subscribe(function (data) {
     // alert(JSON.stringify(data));
      this.colleges = data['data'];
      this.displayData = [ ...this.colleges];
    });
    this.Refresh();
  }

  Refresh() {
    this.http.get('/login/SelectCollege').map(res => res.json()).subscribe(data => {
        this.colleges = data['data'];
        console.log(data);
        this.displayData = [ ...this.colleges];
        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.colleges];
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
      this.displayData = this.colleges.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.colleges;
    }
    this.displayData = [ ...this.colleges];
  }


}
