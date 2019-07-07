import { Component, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {Key, KeyService} from '../shared/key.service';
import {RoleService} from '../shared/role.service';
import {Role} from '../shared/role.service';
import {LocalstorageService} from '../services/localstorage.service';
import { ActivatedRoute, Params} from '@angular/router';
import {Http, RequestOptions, Headers, URLSearchParams, HttpModule  } from '@angular/http';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: Array<Menu>;
  mainMenus: Array<Key> = [];
  childMenus: Array<Key> = [];
  home: Menu;
  role: Role;
  username: string;
  public filter = 0;
  rolename: Array<string> = ['系统管理员', '教师', '学生'];
  rolekeys: Array<number> = [];
  public i: number;
  public j: number;
  currentMenuId: number;
  currentSmallMenuId: number;
  public roleId: number;
  public father = -1;
  public flag = true;
  public keyarray: string;
  public ss: Array<Object>;

  constructor(public changeDetectorRef: ChangeDetectorRef, public  router: Router, private keyService: KeyService, private roleService: RoleService, private storage: LocalstorageService
  , private routerInfo: ActivatedRoute, public http: Http) {
  }

  ngOnInit() {

    if (this.storage.getItem('data') == null) {
      this.router.navigateByUrl('');
      alert('请先进行登录！');
    } else {
      this.username = this.storage.getItem('data').rolename;
      this.keyarray = this.storage.getItem('data').keys;
      const aa = this.keyarray.split(',');
      for (let n = 0; n < aa.length; n++) {
        this.rolekeys.push(parseInt(aa[n]));
      }
      console.log('rolekeys:', this.rolekeys);

      this.mainMenus = this.keyService.getKeys();
      console.log(this.mainMenus);
      for (this.i = 0; this.i < this.rolekeys.length; this.i++) {
        const temp: number = Number(this.rolekeys[this.i]);
        if (temp == 1) {
          let p = 0;
          let q = 0;
          for (p = 0; p < this.mainMenus.length; p++) {
            this.mainMenus[p].flag = true;
            for (q = 0; q < this.mainMenus[p].children.length; q++) {
              this.mainMenus[p].children[q].flag = true;
            }
          }
        } else if (temp < 100) {
          const key1 = this.mainMenus.find(key => key.id == temp);
          key1.flag = true;
          let q = 0;
          for (q = 0; q < key1.children.length; q++) {
            const key2 = key1.children[q];
            key2.flag = true;
          }
        } else if (temp > 99) {
          const p: number = this.keyService.getFatherKey(temp);   // 父节点
          const key3 = this.mainMenus.find(key => key.id == p);
          key3.flag = true;
          let q = 0;
          for (q = 0; q < key3.children.length; q++) {
            if (key3.children[q].id == temp) {
              const key4 = key3.children[q];
              break;
            }
          }
          const key4 = key3.children[q];
          key4.flag = true;
        }
      }
      console.log(this.mainMenus);
    }


  }

  getchildrenkey(item: Key): Array<Key> {
    //console.log(item.children);
    return item.children;
  }

  tofresh() {
    location.reload();
  }


}

export class Menu {
  constructor(public id: number,
              public name: string,
              public link: string,
              public icon: string) {
  }
}

