import { Component, OnInit } from '@angular/core';
import {Permission} from '../../shared/permission.service';
import {LocalstorageService} from '../../services/localstorage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-permdetail',
  templateUrl: './permdetail.component.html',
  styleUrls: ['./permdetail.component.scss']
})
export class PermdetailComponent implements OnInit {

  public perms_id: string;
  public perms_name: string;
  public perms_httpUrl: string;
  public perms_httpType: string;
  public value_isDefault: string;
  public perms_isPage: string;
  public perms_descript: string;
  public perms_isAction: string;
  public perms_level: string;
  public perms_position: string;
  public perms_path: string;
  public parentId: string;
  public perms_set_time: string;
  public perms_set_pers: string;
  public perms_mdfy_time: string;
  public perms_mdfy_pers: string;
  public perms_isMenu: string;
  public permId: number;
  public permission: Permission;
  constructor(private routerInfo: ActivatedRoute, private storage: LocalstorageService) { }

  ngOnInit() {
    this.permId = this.routerInfo.snapshot.params['id'];
    console.log(this.permId);
    this.permission = this.storage.getItem('permission').find(key => key.perms_id == this.permId);
    console.log(this.permission);
    this.perms_id = this.permission.perms_id;
    this.perms_name = this.permission.perms_name;
    this.perms_httpUrl = this.permission.perms_httpUrl;
    this.perms_httpType = this.permission.perms_httpType;
    this.value_isDefault = this.permission.value_isDefault;
    this.perms_isPage = this.permission.perms_isPage;
    this.perms_descript = this.permission.perms_descript;
    this.perms_isAction = this.permission.perms_isAction;
    this.perms_level = this.permission.perms_level;
    this.perms_position = this.permission.perms_position;
    this.perms_path = this.permission.perms_path;
    this.parentId = this.permission.parentId;
    this.perms_set_time = this.permission.perms_set_time;
    this.perms_set_pers = this.permission.perms_set_pers;
    this.perms_mdfy_time = this.permission.perms_mdfy_time;
    this.perms_mdfy_pers = this.permission.perms_mdfy_pers;
    this.perms_isMenu = this.permission.perms_isMenu;

  }

}
