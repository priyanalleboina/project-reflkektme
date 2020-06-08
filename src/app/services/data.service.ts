import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

  private InfluencerData = new BehaviorSubject({});
  private category = new BehaviorSubject([]);
  private measurementsArr = new BehaviorSubject([]);
  private allBrands = new BehaviorSubject([]);
  private isLogOut = new BehaviorSubject(true);
  private countOfPhoto = new Subject();
  private countOfVideo = new Subject();
  private adminData = new BehaviorSubject('');
  private searchBar = new BehaviorSubject<boolean>(false);
  private searchProfileValue =new BehaviorSubject('');

  currentInfluencerData = this.InfluencerData.asObservable();
  categoryArr = this.category.asObservable();
  measurements = this.measurementsArr.asObservable();
  allBrandData = this.allBrands.asObservable();
  logOut = this.isLogOut.asObservable();
  photoCount = this.countOfPhoto.asObservable();
  videoCount = this.countOfVideo.asObservable();
  adminProfile = this.adminData.asObservable();
  searchBarFlag = this.searchBar.asObservable();
  searchProfile = this.searchProfileValue.asObservable();

  constructor() { }
  sendadminProfile(data: any) {
    this.adminData.next(data);
  }
  sendInfluencerData(message: any) {
    this.InfluencerData.next(message);
  }
  sendCategories(message: any) {
    this.category.next(message);
  }
  sendMeasurements(message: any) {
    this.measurementsArr.next(message);
  }
  sendAllBrands(message: any) {
    this.allBrands.next(message);
  }
  logoutUser(flag) {
    this.isLogOut.next(flag);
  }
  setPhotoCount(cnt) {
    this.countOfPhoto.next(cnt);
  }
  setVideoCount(cnt) {
    this.countOfVideo.next(cnt);
  }
  setSearchBar(flag) {
    this.searchBar.next(flag);
  }
  searchProfileData(data) {
    this.searchProfileValue.next(data);
  }
}
