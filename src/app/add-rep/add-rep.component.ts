import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Representative } from '../representative';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { fade } from '../animations/animation';

@Component({
  selector: 'app-add-rep',
  templateUrl: './add-rep.component.html',
  styleUrls: ['./add-rep.component.scss'],
  animations:[
    fade
  ]
})
export class AddRepComponent implements OnInit {
  //Representative model
  public repModel = new Representative("","",0, 0,"","","","","");

  constructor(private data: DataService,private _formBuilder: FormBuilder) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Validation and error checking
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  //Passing representatives to RepsComponent
  public representativeList:MatTableDataSource<any>;

  ngOnInit() {
    this.data.getReps().subscribe(
      data => {
        this.representativeList = new MatTableDataSource(data as {}[]);
        this.representativeList.paginator = this.paginator;
      }
    );

    //Validation and error checking
    this.firstFormGroup = this._formBuilder.group({
      fnameCtrl: ['', Validators.required],
      lnameCtrl: ['', Validators.required],
      ageCtrl: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      numberCtrl: ['', Validators.required],
      partyCtrl: ['', Validators.required],
      areaCtrl: ['', Validators.required],
      provinceCtrl: ['', Validators.required],
      districtCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      uploadCtrl: ['', Validators.required]
    });


  }
  onSubmit1(f: NgForm) {
    this.repModel.fname = f.value.fnameCtrl;
    this.repModel.lname = f.value.lnameCtrl;
    this.repModel.age = f.value.ageCtrl;
  }
  onSubmit2(f: NgForm) {
    this.repModel.number = f.value.numberCtrl;
    this.repModel.party = f.value.partyCtrl;
    this.repModel.area = f.value.areaCtrl;
    this.repModel.province = f.value.provinceCtrl;
    this.repModel.district = f.value.districtCtrl;
  }
  onSubmit3(f: NgForm) {
    this.repModel.image = f.value.uploadCtrl;
    this.data.registerRep(this.repModel).subscribe(
      data => this.data.getReps().subscribe(
        data => this.representativeList = new MatTableDataSource(data as {}[])
      ),
      error => console.log(error)
    );
  }

}
