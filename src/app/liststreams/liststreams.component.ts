import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-liststreams',
  templateUrl: './liststreams.component.html',
  styleUrls: ['./liststreams.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})

export class ListstreamsComponent implements OnInit {
  

  public streamlist$: Object;
  stream2 = "test";
  constructor(private data: DataService) { 
  }

  ngOnInit() {
    this.data.getStreamList().subscribe(
      data => this.streamlist$ = data
    );
  }

  onClick(){
    console.log("Hello it worked well");
  }
}
