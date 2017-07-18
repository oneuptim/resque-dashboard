import {Component, OnInit} from '@angular/core';
import {MdIconRegistry, MdDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import { FormControl } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/mergeMap";

import { Pipe, PipeTransform } from '@angular/core';
import {MdGridListModule} from '@angular/material';
import {MdAutocompleteModule} from '@angular/material';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable'; // <--- This changes from the first Example!
import { Observable } from 'rxjs/Rx';

import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';


@Injectable()

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
  resque :any = {};  
  checksums :any = [];
  queues :any = [];
  workers :any = [];
  keys :any;
  public redis :Object;
  resqueObj :any = {};
  selectedItem :any = {};
  selectedWorker :any = {};
  selectedKey : any = {};
  isDarkTheme :any = true;
  switchDetailsView :any = 0;
  redis_version :string;
  redis_mode :string;
  os :string;
  arch_bits:string;
  used_memory_human :string;
  used_memory_peak_human :string;
  mem_allocator :string;
  used_cpu_sys :string;
  used_cpu_user :string;
  used_cpu_sys_children :string;
  used_cpu_user_children :string;
  viewKeys :any = false;
  keysCtrl :FormControl;
  filteredKeys :any;
  testingData :any;
  showSpinner: boolean = true;

  constructor(
              private http: Http, 
              iconRegistry: MdIconRegistry, 
              sanitizer: DomSanitizer, 
              private dialog: MdDialog, 
              private _http:Http
              ) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);

    // Step 2
    this.getMonitoringData().subscribe((data) => {
      this.resque = data;
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
      // this.selectedKey = this.keys[0];

      this.filteredKeys = this.keysCtrl.valueChanges
              .startWith(null)
              .map(name => this.filterKeys(name));

    });

    this.getChecksumsData().subscribe((data) => {
      this.checksums = data;
    });

    this.keysCtrl = new FormControl();
    
  

  } // End of constructor

  ngOnInit() {  
    // Call method to make API call every 3 seconds and grab results here.
   this.getNewValue()
     .subscribe(
      (res) => 
      console.log(res.json(), '<-- data from interval http calls')
     )
  }


  // Make API Call every 3 seconds and return the most current data
  getNewValue = () => {
    return IntervalObservable
      .create(300000)
      .mergeMap((i) => this.http.get(this._url))
  }

  filterKeys(val: string) {
    let keysNames = [];
    for (var i = 0; i <= this.keys.length - 1; i++) {
      keysNames.push(this.keys[i].key);
    }
    return val ? keysNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : keysNames;
  }

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
    console.log('tab triggered');
    if($event.index == 0) {
      this.switchDetailsView = 0;      
      this.selectedItem = this.queues[0];   
  } else if($event.index == 1) {
      this.switchDetailsView = 1;
      this.selectedWorker = this.workers[0];    
    } else {
      this.switchDetailsView = 2;
      // this.getKeyByFilter(this.keys);

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

  getKeyByFilter(name){
    console.log(name, '<--- getFilter Hit and that is the name');
    let extractedValue = this.keys.filter(x => x.key === name);
    this.selectedKey = extractedValue[0];
    console.log(extractedValue[0]);
    return extractedValue;
    // return this.keys.filter(x => x.name === name);
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Stats', 'Redis', 'Server'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
 
  // Chart events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}



// Queue - switchView true
// Worker - switchView false
// Keys - 


// Resque Stats
// Redis
// Versions

// Upto date button/badge next to versions

// Keys icon



// Add extra
// Add status