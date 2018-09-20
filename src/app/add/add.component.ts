import { Component, OnInit } from '@angular/core';
import { Party } from '../party';
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
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  partynameFormControl = new FormControl('', [
    Validators.required
  ]);
  areacodeFormControl = new FormControl('', [
    Validators.required
  ]);
  imageFormControl = new FormControl('', [
    Validators.required
  ]);
  
  partyModel = new Party("", "", "");
  matcher = new MyErrorStateMatcher();
  constructor(private data: DataService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.data.registerParty(this.partyModel).subscribe(
      data => console.log("Success"),
      err => console.log(err)
    )
  }
}
