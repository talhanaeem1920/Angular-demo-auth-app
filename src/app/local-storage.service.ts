import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

   // get data from local storage
   public getData(key: string) {
    const data = sessionStorage.getItem(key);
    return data;
  }

  // set data in local storage
  public setData(key: string, data: any) {
    sessionStorage.setItem(key, data);
  }

  // remove data from local storage
  public remove(key: string) {
    sessionStorage.removeItem(key);
  }
  
}
