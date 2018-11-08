import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Party } from './party';
import { Representative } from './representative';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "http://35.197.142.51";

  constructor(private http: HttpClient) { }
  getReps() {
    return this.http.get(this.baseUrl+'/api/rep');
  }
  
  getParties() {
    return this.http.get(this.baseUrl+'/api/party');
  }

  getChainInfo() {
    return this.http.get(this.baseUrl+'/multichain/multichain');
  }

  getStreamItems(name: string) {
    return this.http.get(this.baseUrl+'/multichain/liststreamitems/' + name);
  }

  getStreamList() {
    return this.http.get(this.baseUrl+'/multichain/liststreams');
  }

  registerParty(party: Party) {
    return this.http.post<Party>(this.baseUrl+'/api/add_party', party); 
  }

  registerRep(rep: Representative) {
    return this.http.post<Representative>(this.baseUrl+'/api/add_rep', rep); 
  }

  deleteRep(id: string) {
    return this.http.delete(this.baseUrl+'/api/rep/'+id); 
  }

  deleteParty(id: string) {
    return this.http.delete(this.baseUrl+'/api/party/'+id); 
  }

  getRep(id: string) {
    return this.http.get(this.baseUrl+'/api/rep/'+id); 
  }

  updateRep(id: string, rep: Representative) {
    return this.http.post(this.baseUrl+'/api/rep/edit/'+id, rep); 
  }

  getParty(id: string) {
    return this.http.get(this.baseUrl+'/api/party/'+id); 
  }

  updateParty(id: string, party: Party) {
    return this.http.post(this.baseUrl+'/api/party/edit/'+id, party); 
  }


}
