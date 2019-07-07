import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username:string;
  constructor(private storage:LocalstorageService) { }

  ngOnInit() {
    this.username=this.storage.getItem('data').name;

  }






}
