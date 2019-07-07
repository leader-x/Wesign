import { Component, OnInit } from '@angular/core';
import {Teacher, TeacherService} from '../shared/teacher.service';
import 'rxjs/Rx';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Http, URLSearchParams} from '@angular/http';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  private teachers: Array<Teacher>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<Teacher>;
  sortName = null;
  sortValue = null;
  panels = [
    {
      active: false,
      disable: false,
      name  : '高级搜索'
    }
  ];

  constructor(public http: Http, public router: Router, private storage: LocalstorageService, private teacherService: TeacherService) {
    //console.log(this.storage.getItem('t'));

  }

  ngOnInit() {
    this.http.get('/login/SelectTeacher').map(res => res.json()).subscribe(data => {
        this.teachers = data['data'];
        console.log('data1   ', data);
        this.displayData = [ ...this.teachers];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.teachers];
      }
    );
  }

  create() {
    this.router.navigateByUrl('/test/teacher/-1');
  }
  update(teacher: Teacher, key) {
    this.router.navigateByUrl('/test/teacher/' + key);
  }
  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('id', key);
    this.http.post('/login/DeleteTeacher', d1)
      .map(res => res.json()).subscribe(function (data) {
     // alert(JSON.stringify(data));
      this.teachers = data['data'];
      this.displayData = [ ...this.teachers];
    });
    this.Refresh();
  }

  Refresh() {

    this.http.get('/login/SelectTeacher').map(res => res.json()).subscribe(data => {
        this.teachers = data['data'];
        this.displayData = [ ...this.teachers];
        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.teachers];
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
      this.displayData = this.teachers.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.teachers;
      this.displayData = this.teachers;
    }
    this.displayData = [ ...this.teachers];
  }

}
