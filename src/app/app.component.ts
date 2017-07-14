import {Component, OnInit} from '@angular/core';
import {MdIconRegistry, MdDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Pipe, PipeTransform } from '@angular/core';
import {MdGridListModule} from '@angular/material';

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
    transform(value: any, args?: any[]): Object[] {
        let keyArr: any[] = Object.keys(value),
            dataArr = [],
            keyName = args[0];

        keyArr.forEach((key: any) => {
            value[key][keyName] = key;
            dataArr.push(value[key])
        });

        if(args[1]) {
            dataArr.sort((a: Object, b: Object): number => {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }

        return dataArr;
    }

  pipes: [ValuesPipe]
	// directives: [NgFor, NgIf]
    
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


@Injectable()

@Pipe({name: 'keys'})

export class AppComponent {
  private _url:string = 'assets/data/monitoring.json';
  private _checksumsUrl:string = 'assets/data/versions.json';
  resque:any = {};  
  checksums:any = [];
  queues:any = [];
  workers:any = [];
  keys:any = [];
  public redis:Object;
  resqueObj:any = {};
  selectedItem:any = {};
  selectedWorker:any = {};
  isDarkTheme:any = true;
  switchDetailsView:any = true;
  redis_version: string;
  redis_mode: string;
  os: string;
  arch_bits: string;
  used_memory_human: string;
  used_memory_peak_human: string;
  mem_allocator: string;
  used_cpu_sys: string;
  used_cpu_user: string;
  used_cpu_sys_children: string;
  used_cpu_user_children: string;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog, private _http:Http) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);

    // Step 2
    this.getMonitoringData().subscribe((data) => {
      this.resque = data;
      console.log(this.resque);
      this.queues = data.monitoring_json.overview.queues.all_queues;
      this.workers = data.monitoring_json.overview.working.workers_info;
      this.keys = data.monitoring_json.stats_overview.keys;
      this.redis = data.monitoring_json.stats_overview.redis;
      this.redis_version = data.monitoring_json.stats_overview.redis.redis_version;
      this.redis_mode = data.monitoring_json.stats_overview.redis.redis_mode;
      this.os = data.monitoring_json.stats_overview.redis.os;
      this.arch_bits = data.monitoring_json.stats_overview.redis.arch_bits;
      this.used_memory_human = data.monitoring_json.stats_overview.redis.used_memory_human;
      this.used_memory_peak_human = data.monitoring_json.stats_overview.redis.used_memory_peak_human;
      this.mem_allocator = data.monitoring_json.stats_overview.redis.mem_allocator;
      this.used_cpu_sys = data.monitoring_json.stats_overview.redis.used_cpu_sys;
      this.used_cpu_user = data.monitoring_json.stats_overview.redis.used_cpu_user;
      this.used_cpu_sys_children = data.monitoring_json.stats_overview.redis.used_cpu_sys_children;
      this.used_cpu_user_children = data.monitoring_json.stats_overview.redis.used_cpu_user_children;
      this.resqueObj = data.monitoring_json.stats_overview.resque;
      this.selectedItem = this.queues[0];
      this.selectedWorker = this.workers[0];
    });

    this.getChecksumsData().subscribe((data) => {
      this.checksums = data;
      // console.log(data);
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
  
  private openAdminDialog() {
    this.dialog.open(DialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(item => {
        this.queues.push(item);
        this.selectedItem = item;
      });
  }

}




// Resque Stats
// Redis
// Versions

// Upto date button/badge next to versions

// Keys icon



// Add extra
// Add status