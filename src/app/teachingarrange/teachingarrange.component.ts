import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {TeachingarrangeService} from '../shared/teachingarrange.service';
import {Arrange} from '../shared/teachingarrange.service';
import {Http, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-teachingarrange',
  templateUrl: './teachingarrange.component.html',
  styleUrls: ['./teachingarrange.component.scss']
})
export class TeachingarrangeComponent implements OnInit {

  private arranges: Array<Arrange>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<Arrange>;
  sortName = null;
  sortValue = null;
  panels = [
    {
      active: false,
      disable: false,
      name  : '高级搜索'
    }
  ];
  constructor(public http: Http, public router: Router, private ArrangeService: TeachingarrangeService, private storage: LocalstorageService) { }

  ngOnInit() {
    this.http.get('/login/SelectCourse').map(res => res.json()).subscribe(data => {
        this.arranges = data['data'];
        console.log(data);
        this.displayData = [ ...this.arranges];
        if (this.storage.getItem('arrange') != null) {
          this.storage.removeItem('arrange');
        }
        this.storage.setItem('arrange', this.arranges);
        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.arranges];
      }
    );
  }

  create() {
    this.router.navigateByUrl('/test/teachingarrange/-1');
  }
  update(arrange: Arrange, key) {
    this.router.navigateByUrl('/test/teachingarrange/' + key);
  }
  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('record_id1', key);
    this.http.post('/login/DeleteCourse', d1)
      .map(res => res.json()).subscribe(function (data) {
     // alert(JSON.stringify(data));
      this.students = data['data'];
      this.displayData = [ ...this.students];
    });
    this.Refresh();
  }
  todetail(arrange: Arrange, key) {
    this.router.navigateByUrl('/test/teachingdetail/' + key);
  }

  Refresh() {
    this.http.get('/login/SelectCourse').map(res => res.json()).subscribe(data => {
        this.arranges = data['data'];
        console.log(data);
        this.displayData = [ ...this.arranges];
        if (this.storage.getItem('arrange') != null) {
          this.storage.removeItem('arrange');
        }
        this.storage.setItem('arrange', this.arranges);
        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.arranges];
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
      this.displayData = this.arranges.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.arranges;
      this.displayData = this.arranges;
    }
    this.displayData = [ ...this.arranges];
  }

}
