import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Party } from './party';
import { Representative } from './representative';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getReps() {
    return this.http.get('https://localhost/api/rep');
  }
  
  getParties() {
    return this.http.get('https://localhost/api/party');
  }

  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getChainInfo() {
    return this.http.get('https://localhost/multichain/multichain');
  }

  getStreamItems(name: string) {
    return this.http.get('https://localhost/multichain/liststreamitems/' + name);
  }

  getStreamList() {
    return this.http.get('https://localhost/multichain/liststreams');
  }

  registerParty(party: Party) {
    return this.http.post<Party>('https://localhost/api/add_party', party); 
  }

  registerRep(rep: Representative) {
    return this.http.post<Representative>('https://localhost/api/add_rep', rep); 
  }
}
