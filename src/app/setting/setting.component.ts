import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public electionList;
  public electionName = "Election 2018";
  public publicKey = '63643836349122878110314948763039607655658373514564579581533705313808805192463';
  constructor(private data: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data.getElections().subscribe(
      data => {
        this.electionList = data;
      },
      err => {
        console.log(err);
        this.electionList = [];
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onCreate(name: string, key: string) {
    let tmp = {
      name: name,
      publicKey: key
    }
    console.log(tmp);
    this.data.createElection(tmp).subscribe(
      data => {
        this.openSnackBar(`${name} has created`, "close");
        this.data.getElections().subscribe(
          data => {
            this.electionList = data;
          },
          err => {
            console.log(err);
            this.electionList = [];
          }
        );
      },
      err => {
        console.log(err);
        this.openSnackBar(err.message.toString(), "close");
      }
    );
  }
  onToggle(active: Boolean, name: string) {
    if(active) this.data.stopElection(name).subscribe(
      data => {
        this.openSnackBar(`${name} has been stopped`, "close");
        this.data.getElections().subscribe(
          data => {
            this.electionList = data;
          },
          err => {
            console.log(err);
            this.electionList = [];
          }
        );
      },
      err => {
        this.openSnackBar(err.message.toString(), "close");
      }
    );
    else this.data.startElection(name).subscribe(
      data => {
        this.openSnackBar(`${name} has been started`, "close");
        this.data.getElections().subscribe(
          data => {
            this.electionList = data;
          },
          err => {
            console.log(err);
            this.electionList = [];
          }
        );
      },
      err => {
        console.log(err);
        this.openSnackBar(err.message.toString(), "close");
      }
    );
  }

}
