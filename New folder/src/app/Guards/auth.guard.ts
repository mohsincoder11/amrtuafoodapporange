import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../Services/data.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public ds: DataService) {
    this.canActivate();
  }
  canActivate(): boolean {
    if (this.ds.isUserPresent != undefined) {
      if (this.ds.isUserPresent == true) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
