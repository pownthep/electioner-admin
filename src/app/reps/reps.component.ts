import { Component, OnInit, Input, EventEmitter, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Representative } from '../representative';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { fade, slideInRight } from '../animations/animation';

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
  styleUrls: ['./reps.component.scss'],
  animations:
  [
    fade,
    slideInRight
  ]

})

export class RepsComponent implements OnInit {
  //Input from AddRepComponent (list of representatives)
  @Input('input') dataSource: MatTableDataSource<any>;;

  //Defining displayed columns
  public displayedColumns: string[] = ['url','fname', 'lname', 'dob', 'party', 'district', '_id'];
  
  //Filtering function on representative table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private data: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }
  ngOnInit() {
    
  }

  //Delete a representative
  onDelete(id:string) {
    this.data.deleteRep(id).subscribe(
      data => {
        this.snackBar.open("Deleted", "close", {
          duration: 2000,
        });
        this.getDataSource();
      },
      err => {
        this.snackBar.open("Unable to delete", "close", {
          duration: 2000,
        });
        this.getDataSource();
      })
  }

  //Store editted representative info and update database
  onEdit(id:string) {
    this.data.getRep(id).subscribe(
      data => {
        let ref = this.dialog.open(RepEditForm, {
          data:data
        });
        let sub = ref.componentInstance.saved.subscribe((data) => {
          if(data) {
            this.snackBar.open("Successfully updated", "close", {
              duration: 2000,
            })
            this.getDataSource();
            ref.close();
          }
          else {
            this.snackBar.open("Unable to update", "close", {
              duration: 2000,
            })
            this.getDataSource();
            ref.close();
          }
        });
      }
    );
  }

  getDataSource() {
    return this.data.getReps().subscribe(data => this.dataSource = new MatTableDataSource(data as {}[]))
  }
}

@Component({
  selector: 'rep-edit-form',
  templateUrl: './rep.edit.html',
  styleUrls: ['./reps.component.scss']
})
export class RepEditForm implements OnInit {

  public saved = new EventEmitter<boolean>();

  //Representative model for storing form inputs
  public repModel = new Representative("","","","","","");
  //public dataSource: any;

  //Validation and error checking
  matcher = new MyErrorStateMatcher();
  firstFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public rep: any, private _formBuilder: FormBuilder, private data: DataService) {}
  ngOnInit() {

     //Validation and error checking
     this.firstFormGroup = this._formBuilder.group({
      fnameCtrl: [this.rep.fname, Validators.required],
      lnameCtrl: [this.rep.lname, Validators.required],
      dobCtrl: [this.rep.dob, Validators.required],
      partyCtrl: [this.rep.party, Validators.required],
      districtCtrl: [this.rep.district, Validators.required],
      urlCtrl: [this.rep.url, Validators.required]
    });
  }

  onSave(f:any){
    this.repModel.fname = f.value.fnameCtrl == '' ? this.rep.fname : f.value.fnameCtrl;
    this.repModel.lname = f.value.lnameCtrl == '' ? this.rep.lname : f.value.lnameCtrl;
    this.repModel.dob = f.value.dobCtrl == '' ? this.rep.dob : f.value.dobCtrl;
    this.repModel.party = f.value.partyCtrl == '' ? this.rep.party : f.value.partyCtrl;
    this.repModel.district = f.value.districtCtrl == '' ? this.rep.district : f.value.districtCtrl;
    this.repModel.url = f.value.urlCtrl == '' ? this.rep.url : f.value.urlCtrl;
    this.data.updateRep(this.rep._id,this.repModel).subscribe(
      data => this.saved.emit(true),
      err => this.saved.emit(false)
    );
  }
}