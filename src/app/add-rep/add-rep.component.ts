import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Representative } from '../representative';
import { RepsComponent } from '../reps/reps.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-rep',
  templateUrl: './add-rep.component.html',
  styleUrls: ['./add-rep.component.scss']
})
export class AddRepComponent implements OnInit {

  @ViewChild(RepsComponent)
  public repComponent: RepsComponent;

  public repModel = new Representative("","",0,"","","","","");
  matcher = new MyErrorStateMatcher();
  constructor(private data: DataService,private _formBuilder: FormBuilder) { }
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      fnameCtrl: ['', Validators.required],
      lnameCtrl: ['', Validators.required]
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
      data => this.refresh(),
      err => this.refresh()
    );
  }
  refresh() {
    this.repComponent.reloadTable();
  }

}
