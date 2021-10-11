import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.css']
})
export class RightContentComponent implements OnInit {

  //Input responsible for receiving data from left content. Eg. when selecting a beer in my collection, info is shown in right content.
  @Input () currentMsgFromGrandchild1ToGrandchild2: any [];

  constructor() { }

  ngOnInit(): void {
  }

}
