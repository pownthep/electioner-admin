import { Component, OnInit } from "@angular/core";
import { Party } from "../party";
import { DataService } from "../data.service";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatTableDataSource } from "@angular/material/table";
import { fade } from "../animations/animation";
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  partyModel = new Party("", -1, "");
  matcher = new MyErrorStateMatcher();
  constructor(private data: DataService, private _formBuilder: FormBuilder) {}
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  partyList: any;

  ngOnInit() {
    this.initData();
    //Validation and error checking
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      numberCtrl: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      urlCtrl: ["", Validators.required],
    });
  }

  onSubmit1(f: NgForm) {
    this.partyModel.name = f.value.nameCtrl;
  }
  onSubmit2(f: NgForm) {
    this.partyModel.number = f.value.numberCtrl;
  }

  onSubmit3(f: any) {
    this.partyModel.url = f.value.urlCtrl;
    this.data.registerParty(this.partyModel).subscribe(
      (data) => {
        localStorage["party_list"] = JSON.stringify(JSON.parse(localStorage["party_list"]).concat(data));
        this.initData();
      },
      (err) => console.log(err)
    );
    console.log(this.partyModel);
  }

  initData() {
    this.data.getParties().subscribe((data) => {
      if (localStorage["party_list"]) {
        this.partyList = new MatTableDataSource(
          JSON.parse(localStorage["party_list"])
        );
        return;
      }
      localStorage["party_list"] = JSON.stringify(data);
      this.partyList = new MatTableDataSource(data as {}[]);
    });
  }
}
