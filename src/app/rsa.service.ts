import { Injectable } from '@angular/core';
//import * as crypto from "crypto-browserify";

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private publicKey: string;

  constructor() { 
    this.publicKey = '02ee88ca0cd79f702efa5f3af09b4f2fe2c628eb30b7135fbe89a9e69288e386f5'
  }

  /*encrypt(text: string): string {
    let encrypted = crypto.publicEncrypt(this.publicKey, text);

    return encrypted.toString('base64');
  }*/

}
