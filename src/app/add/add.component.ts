import { Component, OnInit } from '@angular/core';
import { Party } from '../party';
import { DataService } from '../data.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import { slideInRight, fade } from '../animations/animation';

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
  styleUrls: ['./add.component.scss'],
  animations:[
    fade
  ]
})
export class AddComponent implements OnInit {
  
  partyModel = new Party("", "", "");
  matcher = new MyErrorStateMatcher();
  constructor(private data: DataService, private _formBuilder: FormBuilder) { }
  partyFormGroup: FormGroup;
  
  partyList:any;

  ngOnInit() {
    this.data.getParties().subscribe(
      data => this.partyList = new MatTableDataSource(data as {}[])
    );

    this.partyFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      areaCtrl: ['', Validators.required],
      imageCtrl: ['', Validators.required]
    });
  }
  onSubmit(f:any) {
    console.log(f);
    this.partyModel.party_name = f.value.nameCtrl;
    this.partyModel.code = f.value.areaCtrl;
    this.partyModel.image_url = f.value.imageCtrl;

    this.data.registerParty(this.partyModel).subscribe(
      data => this.data.getParties().subscribe(
        data => this.partyList = new MatTableDataSource(data as {}[])
      ),
      err => console.log(err)
    );
  }
}
