import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message: string = 'Hi Tim, this is from the Dash!';

  constructor() { }

  ngOnInit() {
    this.showMessage();
  }

  showMessage() {
  console.log(this.message);
  }
}
