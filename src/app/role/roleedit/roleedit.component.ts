import { Component, OnInit , ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../shared/role.service';
import {RoleService} from '../../shared/role.service';
import {LocalstorageService} from '../../services/localstorage.service';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import {Http, RequestOptions, Headers, URLSearchParams, HttpModule  } from '@angular/http';
import zh from '@angular/common/locales/zh';
import {DatePipe} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {Key, KeyService} from '../../shared/key.service';


@Component({
  selector: 'app-roleedit',
  templateUrl: './roleedit.component.html',
  styleUrls: ['./roleedit.component.scss']
})
export class RoleeditComponent implements OnInit {

  @ViewChild('nzTree') nzTree: NzTreeComponent;
  private roles: Array<Role>;
  public roleId: string;
  public name = '';
  public desc = '';
  public createdby = '';
  public createdtime: Date;
  public modifyby = '';
  public modifytime: Date;
  public role: Role;
  public len: number;
  public i: number;
  public id: string;
  public test: Array<NzTreeNode>;
  public num: Array<number> = [];
  public keys: Array<string>;

  validateForm: FormGroup;
  expandKeys = [ '1' ];
  checkedKeys = [ ];
  selectedKeys = [ '', '' ];
  expandDefault = false;
  nodes = [
    new NzTreeNode({
      title   : '是否菜单',
      key     : '1',
      children: [
        {
          title   : '信息管理',
          key     : '10',
          children: [
            {
              title   : '院系管理',
              key     : '100',
              children: []
            },
            {
              title   : '教师管理',
              key     : '101',
              children: []
            },
            {
              title   : '学生管理',
              key     : '102',
              children: []
            },
            {
              title   : '专业管理',
              key     : '103',
              children: []
            },
            {
              title   : '授课安排',
              key     : '104',
              children: []
            },
            {
              title   : '课程管理',
              key     : '105',
              children: []
            }
          ]
        },
        {
          title   : '考勤管理',
          key     : '11',
          children: [
            {
              title   : '历史记录',
              key     : '110',
              children: []
            },
            {
              title   : '考勤排行榜',
              key     : '111',
              children: []
            },
            {
              title   : '考勤参数设置',
              key     : '112',
              children: []
            }
          ]
        },

        {
          title   : '系统管理',
          key     : '13',
          children: [
            {
              title   : '角色管理',
              key     : '130',
              children: []
            },
            {
              title   : '用户管理',
              key     : '131',
              children: []
            },
            {
              title   : '权限管理',
              key     : '132',
              children: []
            }
          ]
        },
        {
          title   : '消息管理',
          key     : '14',
          children: [
            {
              title   : '请假管理',
              key     : '140',
              children: []
            }
          ]
        }
      ]
    }),
    new NzTreeNode({
      title   : '是否http',
      key     : '2',
      children: [
        {
          title          : 'child2.1',
          key            : '10021',
          children       : [],
          disableCheckbox: true
        },
        {
          title   : 'child2.2',
          key     : '10022',
          children: [
            {
              title : 'grandchild2.2.1',
              key   : '100221',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];
  dateMode = 'time';

  constructor(private keyService: KeyService, public datePipe: DatePipe, private routerInfo: ActivatedRoute , private roleService: RoleService, public http: Http,
              private router: Router, private storage: LocalstorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.roleId = this.routerInfo.snapshot.params['id'];
    console.log(this.roleId);
    if (this.roleId != '-1') {
        const k = this.storage.getItem('role').find(key => key.id == this.roleId).keys;
        const a = k.split(',');
        for (let n = 0; n < a.length; n++) {
          this.checkedKeys.push(a[n]);
          //console.log(parseInt(a[n]));
        }
        console.log(this.checkedKeys);


      this.http.get('/login/SelectRole').map(res => res.json()).subscribe(data => {
        console.log(this.checkedKeys);

          this.roles = data['data'];
          console.log(data);
          this.role = this.roles.find(key => key.id == this.roleId);
          console.log(this.role);
          this.id = this.role.id;
          this.desc = this.role.desc;
          this.name = this.role.name;
          this.keys = this.role.keys;
          this.createdby = this.role.createdby;
          this.createdtime = this.role.createdtime;
          this.modifyby = this.role.modifyby;
          this.modifytime = this.role.modifytime;
        }
      );

    }

    this.validateForm = this.fb.group({
      name         : [ null, [ Validators.required ] ],
      createdby         : [ null, [ Validators.required ] ],
      createdtime         : [ null, [ Validators.required ] ],
      modifyby         : [ null, [ Validators.required ] ],
      modifytime         : [ null, [ Validators.required ] ],
      nodes             : [ null, [ Validators.required ] ],
      comment          : [ null, [ Validators.required ] ]
      //agree            : [ false ]
    });

    //console.log(this.roleId);
    registerLocaleData(zh);


  }



  cancel() {
    this.router.navigateByUrl('/test/role');
  }

  mouseAction(name: string, event: NzFormatEmitEvent): void {
    console.log(name, event);
    // just for demo, should get in ngAfterViewInit
    console.log('checkedNodes: %o', this.nzTree.getCheckedNodeList());
    console.log('selectedNodes: %o', this.nzTree.getSelectedNodeList());
    console.log(this.nzTree.nzTreeService.getCheckedNodeList());
    this.test = this.nzTree.nzTreeService.getCheckedNodeList();
    if (this.test) {
      this.num = [];
      for (this.i = 0; this.i < this.test.length; this.i++) {
        console.log(this.test[this.i]['key']);
        this.num.push(parseInt(this.test[this.i]['key']));
        console.log(this.num);
        console.log(this.num.toString());
      }

    }


  }
  save() {
    this.createdtime = new Date(); //  获取当前日期
    this.modifytime = new Date();

    if (this.roleId == '-1') {
      this.id = this.storage.getItem('role');
      const d1 = new URLSearchParams();
      //d1.append('id',this.id);
      d1.append('name', this.name);
      d1.append('desc', this.desc);
      d1.append('keys', this.num.toString());
      d1.append('createdby', this.createdby);
      d1.append('createdtime', this.datePipe.transform(this.createdtime, 'yyyy-MM-dd'));
      this.http.post('/login/AddRole', d1)
        .map(res => res.json()).subscribe(function (data) {
       // alert(JSON.stringify(data));
        if (this.storage.getItem('role') != null) {
          this.storage.removeItem('role');
        }
          this.storage.setItem('role', data['data']);
      });
    } else {
      const kk: string = this.num.toString();
      //修改
      const d1 = new URLSearchParams();
      d1.append('id', this.id);
      d1.append('name', this.name);
      d1.append('desc', this.desc);
      d1.append('keys', kk);
      d1.append('modifyby', this.modifyby);
      d1.append('modifytime', this.datePipe.transform(this.modifytime, 'yyyy-MM-dd'));
      this.http.post('/login/UpdateRole', d1)
        .map(res => res.json()).subscribe(function (data) {
        //alert(JSON.stringify(data));
        console.log(data);
      });

    }

    alert('保存成功！');
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

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'time';
    }
  }

  handleDatePanelChange(mode: string): void {
    console.log('handleDatePanelChange: ', mode);
  }

  getCheckedList(): void {
      //console.log(this.nodes.props.getCheckedNodeList());
  }

}
