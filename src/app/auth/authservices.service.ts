import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor() { }

  SetlocalStorage(key, val: any, next){
    if(typeof window !== undefined){
      localStorage.setItem(key, JSON.stringify(val));
      next();
    }
  }

}
