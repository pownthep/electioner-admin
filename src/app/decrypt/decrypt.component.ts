import { Component, OnInit } from '@angular/core';
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
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {
  key1FormControl = new FormControl('', [
    Validators.required
  ]);
  key2FormControl = new FormControl('', [
    Validators.required
  ]);
  key3FormControl = new FormControl('', [
    Validators.required
  ]);
  key4FormControl = new FormControl('', [
    Validators.required
  ]);
  key5FormControl = new FormControl('', [
    Validators.required
  ]);
  key6FormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){}

}
