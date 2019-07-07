import { Component, OnInit } from '@angular/core';
import {Course} from '../shared/course.service';
import {LocalstorageService} from '../services/localstorage.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Http, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private courses: Array<Course>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public pageindex = 1;
  public pagesize = 10;
  displayData: Array<Course>;
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
    this.http.get('/login/TeacherCourse').map(res => res.json()).subscribe(data => {
        this.courses = data['data'];
        console.log(data);
        this.displayData = [ ...this.courses];
        if (this.storage.getItem('course') != null) {
          this.storage.removeItem('course');
        }
        this.storage.setItem('course', this.courses);

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.courses];
      }
    );
  }
  create() {
    this.router.navigateByUrl('/test/course/-1');
  }
  update(course: Course, key) {
    this.router.navigateByUrl('/test/course/' + key);
  }
  delete(key) {
    console.log(key);
    const d1 = new URLSearchParams();
    d1.append('record_id', key);
    this.http.post('/login/DeleteTeacherCourse', d1)
      .map(res => res.json()).subscribe(function (data) {
      //alert(JSON.stringify(data));
      this.courses = data['data'];
      this.displayData = [ ...this.courses];
    });
  }

  Refresh() {
    this.http.get('/login/TeacherCourse').map(res => res.json()).subscribe(data => {
        this.courses = data['data'];
        console.log(data);
        this.displayData = [ ...this.courses];

        this.nameFilter.valueChanges
          .debounceTime(500)
          .subscribe(value => this.keywork = value);
        this.displayData = [ ...this.courses];
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
      this.displayData = this.courses.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = this.courses;
    }
    this.displayData = [ ...this.courses];
  }

}
