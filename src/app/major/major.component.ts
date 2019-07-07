import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Http, URLSearchParams} from '@angular/http';
import {Major} from '../shared/major.service';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss']
})
export class MajorComponent implements OnInit {
  private majors: Array<Major>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<Major>;
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
    this.http.get('/login/SelectMajor').map(res => res.json()).subscribe(data => {
        this.majors = data['data'];
        console.log(data);
        this.displayData = [ ...this.majors];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.majors];
      }
    );
  }

  create() {
    this.router.navigateByUrl('/test/major/-1');
  }
  update(major: Major, key) {
    this.router.navigateByUrl('/test/major/' + key);
  }
  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('id', key);
    this.http.post('/login/DeleteMajor', d1)
      .map(res => res.json()).subscribe(function (data) {
      //alert(JSON.stringify(data));
      this.majors = data['data'];
      this.displayData = [ ...this.majors];
    });
    this.Refresh();
  }

  Refresh() {
    this.http.get('/login/SelectMajor').map(res => res.json()).subscribe(data => {
        this.majors = data['data'];
        console.log(data);
        this.displayData = [ ...this.majors];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.majors];
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
      this.displayData = this.majors.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.majors;
    }
    this.displayData = [ ...this.majors];
  }

}
