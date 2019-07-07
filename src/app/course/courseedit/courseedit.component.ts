import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from '../../services/localstorage.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {Http, URLSearchParams} from '@angular/http';
import {Course} from '../../shared/course.service';

@Component({
  selector: 'app-courseedit',
  templateUrl: './courseedit.component.html',
  styleUrls: ['./courseedit.component.scss']
})
export class CourseeditComponent implements OnInit {

  private courses: Array<Course>;
  public courseId: string;
  public course: Course;
  public course_id1: string;
  public course_name: string;
  public teacher_id: string;
  public teacher_name: string;
  public record_id: string;

  validateForm: FormGroup;
  listOfOption = [];
  listOfSelectedValue = [];
  constructor(private routerInfo: ActivatedRoute , private fb: FormBuilder,
              private router: Router, private storage: LocalstorageService, public http: Http) { }

  ngOnInit() {
    this.courseId = this.routerInfo.snapshot.params['id'];
    console.log(this.courseId);
    if (this.courseId != '-1') {
      this.course = this.storage.getItem('course').find(key => key.record_id == this.courseId);
      console.log(this.course);
      this.record_id = this.course.record_id;
      this.course_id1 = this.course.course_id;
      this.course_name = this.course.course_name;
      this.teacher_id = this.course.teacher_id;
      this.teacher_name = this.course.teacher_name;

    }
    this.validateForm = this.fb.group({
      course_name       : [ null, [ Validators.required ] ],
      teacher_name         : [ null, [ Validators.required ] ],
      //agree            : [ false ]
    });

  }

  submitForm() {

  }

  cancel() {
    this.router.navigate(['/test/course']);
  }
  save() {
    //this.router.navigateByUrl('/student');
    if (this.courseId == '-1') {
      const courseid: Course = this.storage.getItem('course').find(key => key.course_name == this.course_name);
      const teacherid: Course = this.storage.getItem('course').find(key => key.teacher_name == this.teacher_name);
      const d1 = new URLSearchParams();
      console.log(this.course_name);
      d1.append('course_id1', courseid.course_id);
      d1.append('course_name', this.course_name);
      d1.append('teacher_id', teacherid.teacher_id);
      d1.append('teacher_name', this.teacher_name);
      this.http.post('/login/TeacherCourse', d1)
        .map(res => res.json()).subscribe(function (data) {
     //   alert(JSON.stringify(data));
      });
    } else {
      //修改
      const courseid: Course = this.storage.getItem('course').find(key => key.course_name == this.course_name);
      const d1 = new URLSearchParams();
      d1.append('record_id', this.record_id);
      d1.append('course_id1', courseid.course_id);
      d1.append('teacher_id', this.teacher_id);
      d1.append('teacher_name', this.teacher_name);
      this.http.post('/login/UpdateTeacherCourse', d1)
        .map(res => res.json()).subscribe(function (data) {
       // alert(JSON.stringify(data));
      });

    }

    alert('保存成功！');

  }

}
