import { Component, OnInit ,TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  constructor() { }


  ngOnInit() {

  }
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

}
