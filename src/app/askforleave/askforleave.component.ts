import { Component, OnInit } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service';
import {Leave} from '../shared/leave.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-askforleave',
  templateUrl: './askforleave.component.html',
  styleUrls: ['./askforleave.component.scss']
})
export class AskforleaveComponent implements OnInit {

  public leaves: Array<Leave>;
  public leave: Leave;
  public pageindex = 1;
  public pagesize = 10;
  private  keywork: string;
  private nameFilter: FormControl = new FormControl();

  displayData: Array<Leave>;
  constructor(public http: Http, public router: Router, private storage: LocalstorageService) { }

  ngOnInit() {

    this.http.get('/login/AllLeave').map(res => res.json()).subscribe(data => {
        this.leaves = data['data'];
        console.log(data);
        this.displayData = [ ...this.leaves];
        if (this.storage.getItem('leave') != null) {
          this.storage.removeItem('leave');
        }
        this.storage.setItem('leave', this.leaves);
      }
    );
  }
  sort($event){

  }
  Refresh() {
    this.http.get('/login/AllLeave').map(res => res.json()).subscribe(data => {
      this.leaves = data['data'];
      console.log(data);
      this.displayData = [...this.leaves];
      this.nameFilter.valueChanges
        .debounceTime(500)
        .subscribe(value => this.keywork = value);
      this.displayData = [ ...this.leaves];
    });
  }

}
