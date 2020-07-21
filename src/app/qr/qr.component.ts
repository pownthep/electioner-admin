import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provinces } from "../provinces.js";

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit, OnDestroy {
  scannerData = "";

  formGroup: FormGroup;
  selectedProvince;
  selectedDistrict;
  public provinces = provinces;

  constructor(private data: DataService, private _formBuilder: FormBuilder, public snackBar: MatSnackBar) {  
  }

  ngOnInit() {
    //Validation and error checking
    this.formGroup = this._formBuilder.group({
      districtCtrl: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    
  }

  selectProvince() {
    this.selectProvince = this.selectProvince;
  }

  scanSuccessHandler(e:string) {
    this.scannerData = e;
    console.log(e);
  }


  submit() {
    console.log("Submitting form");
    let user = {
      key: this.scannerData,
      district: this.selectedProvince.Name + " District " + this.selectedDistrict,
    }
    console.log(user);
    this.data.registerUser(user).subscribe(
      data => {
        console.log(data);
        this.snackBar.open(data["_id"] ? "User is registered":data.toString(), "close", {
          duration: 2000,
        });
      },
      err => {
        console.log("Error: "+"\n");
        this.snackBar.open(err.error, "close");
        console.log(err);
      }
    );
  }  

}
