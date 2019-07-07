import { Injectable } from '@angular/core';

@Injectable()
export class PermissionService {

  constructor() { }

}
export class Permission {
  constructor(public perms_id: string,
              public perms_name: string,
              public perms_httpUrl: string,
              public perms_httpType: string,
              public value_isDefault: string,
              public perms_isPage: string,
              public perms_descript: string,
              public perms_isAction:string,
              public perms_level: string,
              public perms_position: string,
              public perms_path: string,
              public parentId: string,
              public perms_set_time:string,
              public perms_set_pers: string,
              public perms_mdfy_time: string,
              public perms_mdfy_pers: string,
              public perms_isMenu:string) {

  }
}
