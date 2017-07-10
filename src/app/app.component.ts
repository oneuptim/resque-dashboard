import {Component, OnInit} from '@angular/core';
import {MdIconRegistry, MdDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  queues = [];
  workers = [];
  resqueObj = {};
  resque = {
      "monitoring_json": {
        "overview": {
          "parameters": {
            "overview_start": {
              "name": "overview_start",
              "values": "Starting Offset. (Default: 0)",
              "description": "Determines the starting offset for Queue information."
            },
            "overview_per_page": {
              "name": "overview_per_page",
              "values": "Records per page. (Default: 19)",
              "description": "How many Queues to return per page."
            }
          },
          "totals": {
            "workers_size": 2,
            "queues_size": 17
          },
          "active": {
            "workers_size": 0,
            "working_jobs_size": 0,
            "jobs_size": 0,
            "active_worker_jobs": [

            ]
          },
          "idle": {
            "workers_size": 2
          },
          "queues": {
            "filtering": {
              "start": 1,
              "per_page": 19
            },
            "all_queues": [
              {
                "pending_jobs": [

                ],
                "queue": "aws_sqs",
                "size": 1,
                "title": "AWS SQS"
              },
              {
                "pending_jobs": [

                ],
                "queue": "aws_update_distinct_state_contacts_count",
                "size": 0,
                "title": "AWS Update Distinct State Contacts Count"
              },
              {
                "pending_jobs": [

                ],
                "queue": "billing",
                "size": 0,
                "title": "Billing"
              },
              {
                "pending_jobs": [

                ],
                "queue": "bulk_email",
                "size": 0,
                "title": "Bulk Email"
              },
              {
                "pending_jobs": [

                ],
                "queue": "chat_archiver",
                "size": 0,
                "title": "Chat Archiver"
              },
              {
                "pending_jobs": [

                ],
                "queue": "contact_import",
                "size": 0,
                "title": "Contact Import"
              },
              {
                "pending_jobs": [

                ],
                "queue": "default",
                "size": 0,
                "title": "Default"
              },
              {
                "pending_jobs": [

                ],
                "queue": "ecard_send_mail",
                "size": 0,
                "title": "eCard Send Mail"
              },
              {
                "pending_jobs": [

                ],
                "queue": "email",
                "size": 0,
                "title": "Email"
              },
              {
                "pending_jobs": [

                ],
                "queue": "etl",
                "size": 0,
                "title": "ETL"
              },
              {
                "pending_jobs": [

                ],
                "queue": "future_actions",
                "size": 0,
                "title": "Future Actions"
              },
              {
                "pending_jobs": [

                ],
                "queue": "generate_file_from_report",
                "size": 0,
                "title": "Generate File from Report"
              },
              {
                "pending_jobs": [

                ],
                "queue": "misc",
                "size": 0,
                "title": "Misc"
              },
              {
                "pending_jobs": [

                ],
                "queue": "product_pull",
                "size": 0,
                "title": "Product Pull"
              },
              {
                "pending_jobs": [

                ],
                "queue": "progress_report",
                "size": 0,
                "title": "Product Report"
              },
              {
                "pending_jobs": [

                ],
                "queue": "report_export_bulk_direct_message",
                "size": 0,
                "title": "Report Export Bulk Direct Message"
              },
              {
                "pending_jobs": [

                ],
                "queue": "system",
                "size": 0,
                "title": "System"
              }
            ]
          },
          "failed_queues": {
            "failed_queue": "Failed",
            "failure_size": 54702
          },
          "working": {
            "workers_info": [
              {
                "callbacks": {
                  "before_first_fork_hook_ran": false,
                  "run_at_exit_hooks": null
                },
                "extra": {
                  "shutdown": null,
                  "paused": null,
                  "verbose": null,
                  "very_verbose": null,
                  "term_timeout": 4,
                  "term_child": null,
                  "graceful_term": null
                },
                "status": {
                  "started": "2017-06-30 07:08:14 +0000",
                  "heartbeat": "2017-06-30T20:29:17.000+00:00",
                  "processed": 2846,
                  "failed": 0,
                  "processing": {
                    "state": "Awaiting Job"
                  }
                },
                "host": "ice-usw2-veng-dev0",
                "pid": "11632",
                "queues": "*",
                "to_s": "ice-usw2-veng-dev0:11632:*"
              },
              {
                "callbacks": {
                  "before_first_fork_hook_ran": false,
                  "run_at_exit_hooks": null
                },
                "extra": {
                  "shutdown": null,
                  "paused": null,
                  "verbose": null,
                  "very_verbose": null,
                  "term_timeout": 4,
                  "term_child": null,
                  "graceful_term": null
                },
                "status": {
                  "started": "2017-06-30 07:08:15 +0000",
                  "heartbeat": "2017-06-30T20:29:18.000+00:00",
                  "processed": 2818,
                  "failed": 0,
                  "processing": {
                    "state": "Awaiting Job"
                  }
                },
                "host": "ice-usw2-veng-dev0",
                "pid": "11633",
                "queues": "*",
                "to_s": "ice-usw2-veng-dev0:11633:*"
              }
            ],
            "registered_workers": [
              {
                "hostname": "ice-usw2-veng-dev0",
                "workers": 2
              }
            ]
          }
        },
        "stats_overview": {
          "resque": {
            "pending": 1,
            "processed": 816314,
            "queues": 17,
            "workers": 2,
            "working": 0,
            "failed": 54702,
            "servers": [
              "redis:\/\/shared-redis-0.egagxw.0001.usw2.cache.amazonaws.com:6379\/0"
            ],
            "environment": "production"
          },
          "redis": {
            "redis_version": "2.8.22",
            "redis_git_sha1": "0",
            "redis_git_dirty": "0",
            "redis_build_id": "0",
            "redis_mode": "standalone",
            "os": "Amazon ElastiCache",
            "arch_bits": "64",
            "multiplexing_api": "epoll",
            "gcc_version": "0.0.0",
            "process_id": "1",
            "run_id": "48a459aac00f4893309107688e8c24ff5fa2ceab",
            "tcp_port": "6379",
            "uptime_in_seconds": "31568112",
            "uptime_in_days": "365",
            "hz": "10",
            "lru_clock": "5682347",
            "config_file": "\/etc\/redis.conf",
            "connected_clients": "780",
            "client_longest_output_list": "0",
            "client_biggest_input_buf": "0",
            "blocked_clients": "21",
            "used_memory": "2588148704",
            "used_memory_human": "2.41G",
            "used_memory_rss": "2384949248",
            "used_memory_peak": "3212009360",
            "used_memory_peak_human": "2.99G",
            "used_memory_lua": "37888",
            "mem_fragmentation_ratio": "0.92",
            "mem_allocator": "jemalloc-3.6.0",
            "loading": "0",
            "rdb_changes_since_last_save": "312283879",
            "rdb_bgsave_in_progress": "0",
            "rdb_last_save_time": "1472238248",
            "rdb_last_bgsave_status": "ok",
            "rdb_last_bgsave_time_sec": "7",
            "rdb_current_bgsave_time_sec": "-1",
            "aof_enabled": "0",
            "aof_rewrite_in_progress": "0",
            "aof_rewrite_scheduled": "0",
            "aof_last_rewrite_time_sec": "-1",
            "aof_current_rewrite_time_sec": "-1",
            "aof_last_bgrewrite_status": "ok",
            "aof_last_write_status": "ok",
            "total_connections_received": "16758572",
            "total_commands_processed": "6799724386",
            "instantaneous_ops_per_sec": "123",
            "total_net_input_bytes": "909722282907",
            "total_net_output_bytes": "41584189931755",
            "instantaneous_input_kbps": "7.35",
            "instantaneous_output_kbps": "18.76",
            "rejected_connections": "0",
            "sync_full": "0",
            "sync_partial_ok": "0",
            "sync_partial_err": "0",
            "expired_keys": "46294343",
            "evicted_keys": "80222",
            "keyspace_hits": "2758045881",
            "keyspace_misses": "1310265402",
            "pubsub_channels": "25",
            "pubsub_patterns": "0",
            "latest_fork_usec": "38431",
            "role": "master",
            "connected_slaves": "0",
            "master_repl_offset": "11244664",
            "repl_backlog_active": "0",
            "repl_backlog_size": "1048576",
            "repl_backlog_first_byte_offset": "10196089",
            "repl_backlog_histlen": "1048576",
            "used_cpu_sys": "86397.15",
            "used_cpu_user": "231115.02",
            "used_cpu_sys_children": "0.44",
            "used_cpu_user_children": "5.11",
            "db0": "keys=128205,expires=6495,avg_ttl=207469837",
            "db1": "keys=367,expires=367,avg_ttl=3132658"
          },
          "keys": [
            {
              "key": "_statuses",
              "type": "zset",
              "size": 9
            },
            {
              "key": "delayed:last_enqueued_at",
              "type": "hash",
              "size": null
            },
            {
              "key": "failed",
              "type": "list",
              "size": 54702
            },
            {
              "key": "queue:aws_sqs",
              "type": "list",
              "size": 1
            },
            {
              "key": "queues",
              "type": "set",
              "size": 17
            },
            {
              "key": "resque_scheduler_master_lock",
              "type": "none",
              "size": [

              ]
            },
            {
              "key": "schedules",
              "type": "hash",
              "size": null
            },
            {
              "key": "stat:failed",
              "type": "string",
              "size": 5
            },
            {
              "key": "stat:processed",
              "type": "string",
              "size": 6
            },
            {
              "key": "stat:processed:ice-usw2-veng-dev0:11632:*",
              "type": "string",
              "size": 4
            },
            {
              "key": "stat:processed:ice-usw2-veng-dev0:11633:*",
              "type": "string",
              "size": 4
            },
            {
              "key": "status:3edab1c27babff10f06e28a81283640c",
              "type": "string",
              "size": 9710
            },
            {
              "key": "status:41f0952a1be53d520375d4c81c710ec4",
              "type": "string",
              "size": 604
            },
            {
              "key": "status:4875d02d64849bdb701f1974ad3ee58a",
              "type": "string",
              "size": 424955
            },
            {
              "key": "status:6bb4e8cd9b33bade3bcd95d5e4b00df2",
              "type": "string",
              "size": 11817
            },
            {
              "key": "status:9406e12f9b65dae9120ccf2dc2610585",
              "type": "string",
              "size": 10014
            },
            {
              "key": "status:a0bf7f4d7617e6dce8ba185819586c03",
              "type": "string",
              "size": 9284
            },
            {
              "key": "status:b46ee7608c3cc3529b640c1321bdff71",
              "type": "string",
              "size": 604
            },
            {
              "key": "status:f76fdbe8086f6c7daa1d52444c5678e5",
              "type": "string",
              "size": 424955
            },
            {
              "key": "status:fbb3f59bdc5c41cd0e579c575cbabf84",
              "type": "string",
              "size": 10455
            },
            {
              "key": "worker:ice-usw2-veng-dev0:11632:*:started",
              "type": "string",
              "size": 25
            },
            {
              "key": "worker:ice-usw2-veng-dev0:11633:*:started",
              "type": "string",
              "size": 25
            },
            {
              "key": "workers",
              "type": "set",
              "size": 2
            },
            {
              "key": "workers:heartbeat",
              "type": "hash",
              "size": null
            }
          ]
        }
      }
    };

  selectedItem = {};
  selectedWorker = {};
  isDarkTheme = true;
  switchDetailsView = true;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
    
    this.queues = this.resque.monitoring_json.overview.queues.all_queues
    this.workers = this.resque.monitoring_json.overview.working.workers_info
    this.resqueObj = this.resque.monitoring_json.stats_overview.resque
    this.selectedItem = this.queues[0];
    this.selectedWorker = this.workers[0];
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
