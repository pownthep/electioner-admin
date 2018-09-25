import {Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { Representative } from '../representative';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-reps',
  templateUrl: './reps.component.html',
  styleUrls: ['./reps.component.scss']
})

export class RepsComponent implements OnInit {
  public displayedColumns: string[] = ['number', 'fname', 'lname', 'party', 'area', 'province', 'district', '_id'];
  public repModel = new Representative("","",0,"","","","","");
  public dataSource: any;
  public editData: Object;
  matcher = new MyErrorStateMatcher();
  firstFormGroup: FormGroup;
  
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private data: DataService, public snackBar: MatSnackBar, private _formBuilder: FormBuilder) { }
  ngOnInit() {
    this.data.getReps().subscribe(
      data => this.dataSource = new MatTableDataSource(data as {}[])
    );
    this.firstFormGroup = this._formBuilder.group({
      fnameCtrl: ['', Validators.required],
      lnameCtrl: ['', Validators.required],
      numberCtrl: ['', Validators.required],
      partyCtrl: ['', Validators.required],
      areaCtrl: ['', Validators.required],
      provinceCtrl: ['', Validators.required],
      districtCtrl: ['', Validators.required],
      uploadCtrl: ['', Validators.required]
    });
  }

  onDelete(id:string) {
    this.data.deleteRep(id).subscribe(data => this.dataSource = new MatTableDataSource(data as {}[]))
  }

  onEdit(id:string) {
    this.data.getRep(id).subscribe(
      data => this.editData = data as {}[]
    );
    
  }
  onSave(f:any){
    this.repModel.fname = f.value.fnameCtrl == '' ? this.editData['fname']: f.value.fnameCtrl;
    this.repModel.lname = f.value.lnameCtrl == '' ? this.editData['lname']: f.value.lnameCtrl;
    this.repModel.number = f.value.numberCtrl == '' ? this.editData['number']: f.value.numberCtrl;
    this.repModel.party = f.value.partyCtrl == '' ? this.editData['party']: f.value.partyCtrl;
    this.repModel.area = f.value.areaCtrl == '' ? this.editData['area']: f.value.areaCtrl;
    this.repModel.province = f.value.provinceCtrl == '' ? this.editData['province']: f.value.provinceCtrl;
    this.repModel.district = f.value.districtCtrl == '' ? this.editData['district']: f.value.districtCtrl;
    this.repModel.image = f.value.uploadCtrl == '' ? this.editData['image']: f.value.uploadCtrl;
    this.data.updateRep(this.editData['_id'],this.repModel).subscribe(
      data => this.data.getReps().subscribe(
        data => this.dataSource = new MatTableDataSource(data as {}[])
      )
    );
  }

  reloadTable(){
    console.log("It worked!");
  }
}