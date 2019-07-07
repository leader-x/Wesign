import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalstorageService} from "../../services/localstorage.service";
import {TeachingarrangeService,Arrange} from "../../shared/teachingarrange.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {Http,URLSearchParams} from "@angular/http";


@Component({
  selector: 'app-teachingedit',
  templateUrl: './teachingedit.component.html',
  styleUrls: ['./teachingedit.component.scss']
})
export class TeachingeditComponent implements OnInit {

  private arranges:Array<Arrange>;
  public arrangeId:number;
  public arrange:Arrange;
  public record_id: string;
  public course_id: string;
  public place_id1: string;
  public place_name:string;
  public course_name:string;
  public course_time:string;
  public course_score:string;
  public course_single_double:string;
  public course_day:string;
  public class_scope:string;
  public course_towho:string;
  public class_weekscope:string;
  public teacher_id:string;
  public teacher_name:string;
  validateForm: FormGroup;
  listOfOption = [];
  listOfSelectedValue = [];

  constructor(public http:Http,private routerInfo:ActivatedRoute ,private arrangeService:TeachingarrangeService,
              private router:Router,private storage:LocalstorageService,private fb: FormBuilder) {
  }

  ngOnInit() {

    this.arrangeId=this.routerInfo.snapshot.params['id'];
    console.log(this.arrangeId);
    if(this.arrangeId>=0)
    {
      this.listOfSelectedValue = [];
      this.arrange=this.storage.getItem('arrange').find(key=>key.record_id1==this.arrangeId);
      console.log(this.arrange);
      this.record_id=this.arrange.record_id1;
      this.course_id=this.arrange.course_id;
      this.place_id1=this.arrange.place_id1;
      this.place_name=this.arrange.place_name;
      this.course_name=this.arrange.course_name;
      this.course_time=this.arrange.course_time;
      this.course_score=this.arrange.course_score;
      this.course_single_double=this.arrange.course_single_double;
      this.course_day=this.arrange.course_day;
      this.class_scope=this.arrange.class_scope;
      this.course_towho=this.arrange.course_towho;
      this.class_weekscope=this.arrange.class_weekscope;
    }
    const children = [];
    children.push({ label:'星期一' , value:'星期一' });
    children.push({ label:'星期二' , value:'星期二' });
    children.push({ label:'星期三' , value:'星期三' });
    children.push({ label:'星期四' , value:'星期四' });
    children.push({ label:'星期五' , value:'星期五' });
    children.push({ label:'星期六' , value:'星期六' });
    children.push({ label:'星期日' , value:'星期日' });
    this.listOfOption = children;
    this.listOfSelectedValue.push(this.course_day);



    this.validateForm = this.fb.group({
      course_id         : [ null, [ Validators.required ] ],
      course_name       : [ null, [ Validators.required ] ],
      place_id1         : [ null, [ Validators.required ] ],
      teacher_id          : [ null, [ Validators.required ] ],
      teacher_name         : [ null, [ Validators.required ] ],
      place_name         : [ null, [ Validators.required ] ],
      course_score         : [ null, [ Validators.required ] ],
      course_time         : [ null, [ Validators.required ] ],
      class_weekscope         : [ null, [ Validators.required ] ],
      class_scope        : [ null, [ Validators.required ] ],
      course_towho       : [ null, [ Validators.required ] ],
      course_single_double    : [ null, [ Validators.required ] ],
      listOfSelectedValue: [ null, [ Validators.required ] ],
      //agree            : [ false ]
    });
  }



  /////////////////////////////////////////////

  cancel(){
    this.router.navigate(['/test/arrange']);
  }
  save(){
    //this.router.navigateByUrl('/arrange');
    if(this.arrangeId==-1)
    {
      var courseid:Arrange=this.storage.getItem('arrange').find(key=>key.course_name==this.course_name);
      var placeid:Arrange=this.storage.getItem('arrange').find(key=>key.place_name==this.place_name);
      let d1=new URLSearchParams();
      d1.append('course_id',courseid.course_id);
      d1.append('place_id1',placeid.place_id1);
      d1.append('place_name',this.place_name);
      d1.append('course_name',this.course_name);
      d1.append('course_time',this.course_time);
      d1.append('course_score',this.course_score);
      d1.append('course_single_double',this.course_single_double);
      d1.append('course_day',this.listOfSelectedValue.toLocaleString());
      d1.append('class_scope',this.class_scope);
      d1.append('course_towho',this.course_towho);
      d1.append('class_weekscope',this.class_weekscope);
      this.http.post('/login/AddCourse',d1)
        .map(res => res.json()).subscribe(function (data) {
      //  alert(JSON.stringify(data));
      })

    }
    else
    {
      //修改
      let d1=new URLSearchParams();
      d1.append('record_id1',this.record_id);
      d1.append('course_id',this.course_id);
      d1.append('place_id1',this.place_id1);
      d1.append('place_name',this.place_name);
      d1.append('course_name',this.course_name);
      d1.append('course_time',this.course_time);
      d1.append('course_score',this.course_score);
      d1.append('course_single_double',this.course_single_double);
      d1.append('course_day',this.listOfSelectedValue.toLocaleString());
      d1.append('class_scope',this.class_scope);
      d1.append('course_towho',this.course_towho);
      d1.append('class_weekscope',this.class_weekscope);
      this.http.post('/login/UpdateCourse',d1)
        .map(res => res.json()).subscribe(function (data) {
      //  alert(JSON.stringify(data));
      })

    }

    alert("保存成功！");

  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


  handleDatePanelChange(mode: string): void {
    console.log('handleDatePanelChange: ', mode);
  }

  getCheckedList(): void
  {
    //console.log(this.nodes.props.getCheckedNodeList());
  }

}
