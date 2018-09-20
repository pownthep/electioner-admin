import { Component, OnInit } from '@angular/core';
import { Representative } from '../representative';
import { DataService } from '../data.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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
  repModel = new Representative("","","","","","","","","");
  
  fnameFormControl = new FormControl('', [
    Validators.required
  ]);
  lnameFormControl = new FormControl('', [
    Validators.required
  ]);
  partyFormControl = new FormControl('', [
    Validators.required
  ]);
  codeFormControl = new FormControl('', [
    Validators.required
  ]);
  provinceFormControl = new FormControl('', [
    Validators.required
  ]);
  districtFormControl = new FormControl('', [
    Validators.required
  ]);
  sdistrictFormControl = new FormControl('', [
    Validators.required
  ]);
  pimageFormControl = new FormControl('', [
    Validators.required
  ]);

  keyFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private data: DataService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.data.registerRep(this.repModel).subscribe(
      data => console.log("Success"),
      err => console.log(err)
    )
  }

}
