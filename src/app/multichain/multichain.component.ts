import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multichain',
  templateUrl: './multichain.component.html',
  styleUrls: ['./multichain.component.scss']
})
export class MultichainComponent implements OnInit {

  chaininfo$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getChainInfo().subscribe(
      data => this.chaininfo$ = data
    );
  }

}
