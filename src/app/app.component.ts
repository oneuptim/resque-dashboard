import {Component, OnInit} from '@angular/core';
import {MdIconRegistry, MdDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  private _url:string = 'assets/data/monitoring.json';
  private _checksumsUrl:string = 'assets/data/versions.json';
  resque = {};  
  checksums = [];
  queues = [];
  workers = [];
  resqueObj = {};
  selectedItem:any = {};
  selectedWorker = {};
  isDarkTheme = true;
  switchDetailsView = true;


  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog, private _http:Http) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);

    // Step 2
    this.getMonitoringData().subscribe((data) => {
      this.resque = data;
      this.queues = data.monitoring_json.overview.queues.all_queues
      this.workers = data.monitoring_json.overview.working.workers_info
      this.resqueObj = data.monitoring_json.stats_overview.resque
      this.selectedItem = this.queues[0];
      this.selectedWorker = this.workers[0];
    });

    this.getChecksumsData().subscribe((data) => {
      this.checksums = data;
      console.log(data);
    });

  } // End of constructor

  // Step 1
  private getMonitoringData() {
    return this._http.get(this._url)
      .map((res:Response) => res.json()); 
  }

  private getChecksumsData() {
    return this._http.get(this._checksumsUrl)
    .map((res:Response) => res.json());
  }

  private selectTab($event) {
    if($event.index == 0) {
      this.switchDetailsView = true;      
      this.selectedItem = this.queues[0];   
  } else {
      this.switchDetailsView = false;
      this.selectedWorker = this.workers[0];    
    }
  }

  // private selectListItem($event) {
  //   console.log($event);
  // }
  
  private openAdminDialog() {
    this.dialog.open(DialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(item => {
        this.queues.push(item);
        this.selectedItem = item;
      });
  }

}
