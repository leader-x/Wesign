import { Component, OnInit } from '@angular/core';
import {Permission} from '../shared/permission.service';
import {Http, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  public permissions: Array<Permission>;
  public nameFilter: FormControl = new FormControl();
  public  keywork: string;
  public permission: Permission;
  public pageindex = 1;
  public pagesize = 10;

  displayData: Array<Permission>;
  constructor(public http: Http, public router: Router, private storage: LocalstorageService) { }

  ngOnInit() {
    this.http.get('/login/SelectPermission').map(res => res.json()).subscribe(data => {
        this.permissions = data['data'];
        console.log(data);
        this.displayData = [ ...this.permissions];
        if (this.storage.getItem('permission') != null) {
          this.storage.removeItem('permission');
        }
        this.storage.setItem('permission', this.permissions);
      }
    );
  }
  todetail(permission: Permission, key) {
    this.router.navigateByUrl('/test/permdetail/' + key);
  }
  sort($event) {

  }


  Refresh() {
    this.http.get('/login/SelectPermission').map(res => res.json()).subscribe(data => {
      this.permissions = data['data'];
      console.log(data);
      this.displayData = [...this.permissions];

      this.nameFilter.valueChanges
        .debounceTime(500)
        .subscribe(value => this.keywork = value);
      this.displayData = [ ...this.permissions];
    });
  }
}
