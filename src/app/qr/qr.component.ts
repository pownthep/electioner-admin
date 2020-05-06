import { Component, OnInit, OnDestroy } from '@angular/core';
import jsQR from "jsqr";
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
let pubKey = "PUBLIC KEY";
let stop = true;
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit, OnDestroy {
  public key = pubKey;
  public camera = stop ? "TURN ON":"TURN OFF";
  formGroup: FormGroup;
  constructor(private data: DataService, private _formBuilder: FormBuilder, public snackBar: MatSnackBar) {  
  }

  ngOnInit() {
    //Validation and error checking
    this.formGroup = this._formBuilder.group({
      districtCtrl: ['', Validators.required]
    });
    this.getQR();
  }

  getQR() {
    const video = document.createElement('video');
    const canvasElement: any = document.getElementById('canvas');
    const canvas = canvasElement.getContext('2d');
    const loadingMessage = document.getElementById("loadingMessage");
    const outputContainer = document.getElementById('output');
    const outputData = document.getElementById('outputData');

    function drawLine(begin, end, color) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
      video.srcObject = stream;
      // video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    function tick() {
      if(stop == false) {
        outputData.innerText = "";
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          loadingMessage.hidden = true;
          canvasElement.hidden = false;
          outputContainer.hidden = false;
  
          canvasElement.height = video.videoHeight;
          canvasElement.width = video.videoWidth;
          canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
          const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#009688');
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#009688');
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#009688');
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#009688');
            outputData.parentElement.hidden = false;
            outputData.innerText = code.data;
            if(code.data.length > 0) {
              stop = true;
              pubKey = code.data;
              video.pause();
            }
          } else {
            outputData.parentElement.hidden = false;
          }
          video.play();
        }
      }
      requestAnimationFrame(tick);
    }
  }
  ngOnDestroy() {
    stop = true;
  }

  toggle() {
    stop = !stop;
    this.camera = stop ? "TURN ON":"TURN OFF";
  }

  submit(f: NgForm, key: string) {
    stop = false;
    this.camera = stop ? "TURN ON":"TURN OFF";
    let user = {
      key: key,
      district: f.value.districtCtrl
    }
    this.data.registerUser(user).subscribe(
      data => {
        this.snackBar.open('User', "close", {
          duration: 2000,
        });
      },
      err => {
        console.log("Error: "+"\n");
        this.snackBar.open(err.error.text, "close");
        console.log(err);
      }
    );
    console.log(stop);
  }
  public provinces = [
    {
      Name: "AngThong",
      District: [1]
  
    },
    {
      Name: "SingBuri",
      District: [1]
  
    },
    {
      Name: "Trat",
      District: [1]
  
    },
    {
      Name: "NakhonNayok",
      District: [1]
    },
    {
      Name: "MaeHongSon",
      District: [1]
  
    },
    {
      Name: "SamutSongkhram",
      District: [1]
  
    },
    {
      Name: "PhangNga",
      District: [1]
  
    },
    {
      Name: "Ranong",
      District: [1]
  
    },
    {
      Name: "Satun",
      District: [1]
  
    },
    {
      Name: "ChaiNat",
      District: [1,2]
  
    },
    {
      Name: "AmnatCharoen",
      District: [1,2]
  
    },
    {
      Name: "BuengKan",
      District: [1,2]
  
    },
    {
      Name: "Mukdahan",
      District: [1,2]
  
    },
    {
      Name: "Lamphun",
      District: [1,2]
  
    },
    {
      Name: "Uttaradit",
      District: [1,2]
  
    },
    {
      Name: "Phrae",
      District: [1,2]
    },
    {
      Name: "UthaiThani",
      District: [1,2]
  
    },
    {
      Name: "Krabi",
      District: [1,2]
  
    },
    {
      Name: "Phuket",
      District: [1,2]
  
    },
      {
      Name: "Saraburi",
      District: [1,2,3]
    },
    {
      Name: "Chanthaburi",
      District: [1,2,3]
  
    },
    {
      Name: "Prachinburi",
      District: [1,2,3]
  
    },
    {
      Name: "SaKaeo",
      District: [1,2,3]
  
    },
    {
      Name: "Yasokhon",
      District: [1,2,3]
  
    },
    {
      Name: "NongBuaLamphu",
      District: [1,2,3]
  
    },
    {
      Name: "Loei",
      District: [1,2,3]
  
    },
    {
      Name: "Nong Khai",
      District: [1,2,3]
  
    },
    {
      Name: "Nan",
      District: [1,2,3]
  
    },
    {
      Name: "Phaoyao",
      District: [1,2,3]
  
    },
    {
      Name: "Tak",
      District: [1,2,3]
  
    },
    {
      Name: "Sukhothai",
      District: [1,2,3]
  
    },
    {
      Name: "Phichit",
      District: [1,2,3]
  
    },
    {
      Name: "SamutSakhon",
      District: [1,2,3]
  
    },
    {
      Name: "Phetchaburi",
      District: [1,2,3]
  
    },
    {
      Name: "PrachuapKhiriKhun",
      District: [1,2,3]
  
    },
    {
      Name: "Chumphon",
      District: [1,2,3]
  
    },
    {
      Name: "Trang",
      District: [1,2,3]
  
    },
    {
      Name: "Phatthalung",
      District: [1,2,3]
  
    },
    {
      Name: "Yala",
      District: [1,2,3]
  
    },
      {
      Name: "PhraNakhonSiAyutthaya",
      District: [1,2,3,4]
  
    },
    {
      Name: "Lopburi",
      District: [1,2,3,4]
  
    },
    {
      Name: "Rayong",
      District: [1,2,3,4]
  
    },
    {
      Name: "Chachoengsao",
      District: [1,2,3,4]
  
    },
    {
      Name: "NakhonPhanom",
      District: [1,2,3,4]
  
    },
    {
      Name: "Lampang",
      District: [1,2,3,4]
  
    },
    {
      Name: "KhamphaengPhet",
      District: [1,2,3,4]
  
    },
    {
      Name: "Pattani",
      District: [1,2,3,4]
  
    },
    {
      Name: "Narathiwat",
      District: [1,2,3,4]
  
    },
    {
      Name: "MahaSarakham",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "Kalasin",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "Phisanulok",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "Phetchabun",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "Ratchaburi",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "Kanchanaburi",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "SuphanBuri",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "NakhonPathom",
      District: [1,2,3,4,5]
  
    },
    {
      Name: "Nonthaburi",
      District: [1,2,3,4,5,6]
  
    },
    {
      Name: "PathumThani",
      District: [1,2,3,4,5,6]
  
    },
    {
      Name: "Chaiyaphum",
      District: [1,2,3,4,5,6]
  
    },
    {
      Name: "SakonNakhon",
      District: [1,2,3,4,5,6]
  
    },
    {
      Name: "NakhonSawan",
      District: [1,2,3,4,5,6]
  
    },
    {
      Name: "SuratThani",
      District: [1,2,3,4,5,6]
  
    },
    {
      Name: "SamutPhakan",
      District: [1,2,3,4,5,6,7]
  
    },
    {
      Name: "Surin",
      District: [1,2,3,4,5,6,7]
  
    },
    {
      Name: "Roi Et",
      District: [1,2,3,4,5,6,7]
  
    },
    {
      Name: "ChiangRai",
      District: [1,2,3,4,5,6,7]
  
    },
    {
      Name: "Chonburi",
      District: [1,2,3,4,5,6,7,8]
  
    },
    {
      Name: "Buriram",
      District: [1,2,3,4,5,6,7,8]
  
    },
    {
      Name: "Sisaket",
      District: [1,2,3,4,5,6,7,8]
  
    },
    {
      Name: "UdonThani",
      District: [1,2,3,4,5,6,7,8]
  
    },
    {
      Name: "NakhonSiThammarat",
      District: [1,2,3,4,5,6,7,8]
  
    },
    {
      Name: "SongKhla",
      District: [1,2,3,4,5,6,7,8]
  
    },
    {
      Name: "ChiangMai",
      District: [1,2,3,4,5,6,7,8,9]
  
    },
    {
      Name: "UbonRatchathani",
      District: [1,2,3,4,5,6,7,8,9,10]
  
    },
    {
      Name: "KhonKaen",
      District: [1,2,3,4,5,6,7,8,9,10]
  
    },
    {
      Name: "NakhonRatchasima",
      District: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  
    },
    {
      Name: "Bangkok",
      District: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  
    }
  ]
  

}
