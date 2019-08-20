import { Injectable } from '@angular/core';
import { Storage } from  '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  
  constructor(private storage : Storage) { }

  userToken(){
    return this.storage.get("TOKEN");
  }

  userEmail(){
    return this.storage.get("EMAIL");
  }

  userName(){
    return this.storage.get("USERNAME");
  }

  userId(){
    return this.storage.get("ID");
  }

}
