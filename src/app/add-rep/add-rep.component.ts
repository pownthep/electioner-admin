import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { NgForm, Validators } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Representative } from "../representative";
import { MatTableDataSource } from "@angular/material/table";
import { provinces } from "../provinces.js";

@Component({
  selector: "app-add-rep",
  templateUrl: "./add-rep.component.html",
  styleUrls: ["./add-rep.component.scss"],
})
export class AddRepComponent implements OnInit {
  //Public variables
  public repData;
  public representativeList: MatTableDataSource<any>; //Passing representatives to RepsComponent
  public partyList;
  public districts = [];
  public provinces = provinces;

  //Representative model
  public repModel = new Representative("", "", "", "", "", "");
  constructor(private data: DataService, private _formBuilder: FormBuilder) {
    if (localStorage["rep_data"]) {
      const data = JSON.parse(localStorage["rep_data"]);
      this.representativeList = new MatTableDataSource(data);
    } else {
      this.data.getReps().subscribe((data) => {
        localStorage["rep_data"] = JSON.stringify(data);
        this.representativeList = new MatTableDataSource(data as {}[]);
      });
    }

    this.data.getParties().subscribe((data) => {
      this.partyList = data;
    });
  }

  //Validation and error checking
  firstGroup: FormGroup;
  secondGroup: FormGroup;
  thirdGroup: FormGroup;

  ngOnInit() {
    //Validation and error checking
    this.firstGroup = this._formBuilder.group({
      fnameCtrl: ["", Validators.required],
      lnameCtrl: ["", Validators.required],
      dobCtrl: [{ disabled: true }, Validators.required],
    });
    this.secondGroup = this._formBuilder.group({
      partyCtrl: ["", Validators.required],
      provinceCtrl: ["", Validators.required],
      districtCtrl: ["", Validators.required],
    });
    this.thirdGroup = this._formBuilder.group({
      urlCtrl: ["", Validators.required],
    });
  }
  onSubmit1(f: NgForm) {
    this.repModel.fname = f.value.fnameCtrl;
    this.repModel.lname = f.value.lnameCtrl;
    this.repModel.dob = f.value.dobCtrl;
  }
  onSubmit2(f: NgForm) {
    this.repModel.party = f.value.partyCtrl;
    this.repModel.district =
      f.value.provinceCtrl.Name + " District " + f.value.districtCtrl;
    console.log(f.value.provinceCtrl);
  }
  onSubmit3(f: NgForm) {
    this.repModel.url = f.value.urlCtrl;
    this.data.registerRep(this.repModel).subscribe(
      (data) =>
        this.data
          .getReps()
          .subscribe(
            (data) =>
              (this.representativeList = new MatTableDataSource(data as {}[]))
          ),
      (error) => console.log(error)
    );
  }
}
