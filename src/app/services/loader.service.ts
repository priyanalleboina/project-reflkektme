import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({  providedIn: 'root'})
export class LoaderService {

  private loader = new BehaviorSubject(false);
  change = this.loader.asObservable();

  constructor() {
    // Do code
  }

  toggle(loader: boolean) {
    this.loader.next(loader);
  }
}
