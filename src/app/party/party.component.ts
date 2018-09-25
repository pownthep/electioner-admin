import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'url', '_id'];
  dataSource:any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getParties().subscribe(
      data => this.dataSource = new MatTableDataSource(data as {}[])
    );
  }

}
