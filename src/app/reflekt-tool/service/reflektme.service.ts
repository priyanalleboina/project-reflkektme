import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReflektmeService {

  constructor(private readonly httpService: HttpService) { }

  // createInfluencer(data): Observable<any> {
  //   const url = environment.copmonentUrl.adminDashboard.userController.createinfluencer;
  //   const formData: FormData = new FormData();
  //   if (data.file) {
  //     formData.append('file', data.file, data.file.name);
  //   }
  //   formData.append('email', data.email);
  //   formData.append('first_name', data.first_name);
  //   formData.append('last_name', data.last_name);
  //   formData.append('password', data.password);
  //   return this.httpService.post(url, formData);
  // }
  public getMeasurements(): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.ProductController.measurements;
    return this.httpService.get(url);
  }
  public getAllGuestUser(page, size): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined) {
      params.append('page', page);
    }
    if (size != undefined) {
      params.append('size', size);
    }
    const url = environment.copmonentUrl.reflektTool.GuestUserController.getAllGuestUser;
    return this.httpService.get(url, { params: params });
  }

  public createGuestUser(data): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.GuestUserController.createGuestUser;
    return this.httpService.post(url, data);
  }
  public getTempLogin(): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.GuestUserController.templogin;
    return this.httpService.get(url);
  }
  public getAllMediaProduct(prodcutId): Observable<any> {
    // let params = new HttpParams();
    // alert(prodcutId)
    // params.append('prodcutId', prodcutId);
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getAllMediaProduct + '?prodcutId=' + prodcutId;
    return this.httpService.get(url);
  }
  public getProductByCategory(categoryId): Observable<any> {
    let params = new HttpParams();
    params.append('categoryId', categoryId);
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getProductByCategory;
    return this.httpService.get(url, { params: params });
  }
  public getAllBrands(): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.BrandController.getAllBrands;
    return this.httpService.get(url);
  }

  public uploadFile(file, media_type): Observable<any> {
    const formData: FormData = new FormData();
    let params = new HttpParams();
    formData.append(`files`, file, file.name);
    params = params.append('mediaType', media_type);
    const url = environment.copmonentUrl.influencerDashboard.fileUploadController.uploadFile;
    return this.httpService.post(url, formData, { params: params });
  }

  public createCustomer(data): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.createCustomer;
    return this.httpService.post(url, data);
  }

  public updateCustomer(data): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.updateCustomer;
    return this.httpService.post(url, data);
  }

  public createReview(data): Observable<any> {
    const url = environment.copmonentUrl.ReviewController.createReview;
    return this.httpService.post(url, data);
  }

  public saveCustomerMeasurements(data): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.saveCustomerMeasurements;
    return this.httpService.post(url, data);
  }
  public getSize(): Observable<any> {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getAllSize;
    return this.httpService.get(url);
  }
  public getProductData(data): Observable<any> {
    let params = new HttpParams();
    params.append('prodcutUrl', data.productURL);
    params.append('wearingSize', data.size);
    console.log(data);
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getProductByURLAndSize + '?prodcutUrl=' + data.productURL + '&wearingSize=' + data.size;
    console.log(params);
    return this.httpService.get(url);
  }
  public getProductDataByProductURL(prodcutUrl): Observable<any> {
    let routeData = new HttpParams();
    routeData.append('prodcutUrl', prodcutUrl);
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getProductByProductURL + '?prodcutUrl=' + prodcutUrl;
    return this.httpService.get(url);
  }
  public getMeaurements(id): Observable<any> {
    let routeData = new HttpParams();
    routeData.append('id', id);
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getCustomerMeasurements;
    return this.httpService.get(url, { params: routeData });
  }
  // Upload Multiple Images
  public uploadMultipleImagesForInfluencer(files: Array<File>, media_type): Observable<any> {
    console.log('filelist==', JSON.stringify(files));
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i] && files[i].name) {
        formData.append(`files`, files[i], files[i].name);
      }
      formData.append('mediaType', media_type);
    }
    const url = environment.copmonentUrl.influencerDashboard.fileUploadController.multipleImageUpload;
    return this.httpService.post(url, formData);
  }
  public getAllReviews(productUrl) {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getReviewByUserId + '?productUrl=' + productUrl;
    return this.httpService.get(url);
  }
  public getMeasurmentDetailByID(id) {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getMeasurementdetailByMedia + '?mediaId=' + id;
    return this.httpService.get(url);
  }
  public findProductByMediaID(id) {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.findProductByMedia + '?mediaId=' + id;
    return this.httpService.get(url);
  }
  public getReviewOfProduct(productUrl) {
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getProductReview + '?prodcutUrl=' + productUrl;
    return this.httpService.get(url);
  }
  public getProductRecommendationData(data): Observable<any> {
    let params = new HttpParams();
    if (data.guestUserId) {
      params = params.append('guestUserId', data.guestUserId);
    }
    params = params.append('page', data.page);
    params = params.append('productId', data.productId);
    if (data.productCategoryId) {
      params = params.append('productCategoryId', data.productCategoryId);
    }
    if (data.size) {
      params = params.append('size', data.size);
    }
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.getProductRecommendation;
    return this.httpService.post(url, {}, { params: params });
  }
  public getViewAllProductRecommendationData(data): Observable<any> {
    let params = new HttpParams();
    // if (data.guestUserId) {
    //   params = params.append('guestUserId', data.guestUserId);
    // }
    params = params.append('page', data.page);
    if (data.productCategoryId) {
      params = params.append('productCategoryId', data.productCategoryId);
    }
    if (data.productId) {
      params = params.append('productId', data.productId);
    }
    if (data.size) {
      params = params.append('size', data.size);
    }
    const url = environment.copmonentUrl.reflektTool.ReflektmeToolController.viewAllProducts;
    return this.httpService.post(url, {}, { params: params });
  }
}
