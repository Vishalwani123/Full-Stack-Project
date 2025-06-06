import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  static saveToken(token: string):void{
    // window.localStorage.removeItem(TOKEN);
    // window.localStorage.setItem(TOKEN,token);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken():string | null {
    // return window.localStorage.getItem(TOKEN);
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser():any {
    // return JSON.parse(window.localStorage.getItem(USER)
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(window.localStorage.getItem(USER) || '{}');
    }
    return null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null) return '';
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() === null) return false;
    const role: string = this.getUserRole();
    return role === "ADMIN";
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken() === null) return false;
    const role: string = this.getUserRole();
    return role === "CUSTOMER";
  }

  static hasToken(): boolean{
    if(this.getToken() === null) return false;
    return true;
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user === null) return "";
    return user.id;
  }

  static signout(): void{
    // window.localStorage.removeItem(TOKEN);
    // window.localStorage.removeItem(USER);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
