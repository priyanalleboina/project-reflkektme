import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  temp: any;
  constructor(private readonly httpService: HttpService) {
  }

  // (addInfluencer)
  public saveAddInfluencerDetails(data): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.userController.createinfluencer;
    // const formData: FormData = new FormData();
    // if (data.file) {
    //     formData.append('file', data.file, data.file.name);
    //     this.temp = data.file;
    // }
    // formData.append('email', data.email);
    // formData.append('first_name', data.first_name);
    // formData.append('last_name', data.last_name);
    // formData.append('password', data.password);
    return this.httpService.post(url, data);
  }
  // (addAdmin)
  public saveAddAdminDetails(data): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.userController.createadmin;
    // const formData: FormData = new FormData();
    // if (data.file) {
    //     formData.append('file', data.file, data.file.name);
    //     this.temp = data.file;
    // }
    // formData.append('email', data.email);
    // formData.append('first_name', data.first_name);
    // formData.append('last_name', data.last_name);
    // formData.append('password', data.password);
    return this.httpService.post(url, data);
  }
  public generatePasswordInfluencer(): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.userController.passwordgenerator;
    return this.httpService.get(url);
  }

  // (size chart) category controller
  public getSizeChartDetails(): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.CategoryController.findallcategory;
    return this.httpService.get(url);
  }

  public updateSizeValue(data): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.CategoryController.updatesizevalue;
    return this.httpService.put(url, data);
  }

  // product controller
  public createProduct(data): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.ProductController.create_product;
    return this.httpService.post(url, data);
  }

  public getAllmediaOfInfluencer(): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllMediaOfInfluencer;
    return this.httpService.get(url);
  }
  public getAllMediaByInfluencerAndMediaType(mediaType) {
    let params = new HttpParams();
    params = params.append('mediatype', mediaType);
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllMediaByInfluencerAndMediaType;
    return this.httpService.get(url, { params: params });
  }
  public findProductByMedia(mediaId) {
    let params = new HttpParams();
    params = params.append('mediaId', mediaId);
    const url = environment.copmonentUrl.adminDashboard.ProductController.findProductByMedia;
    return this.httpService.get(url, { params: params });
  }

  public getAllProductOfInfluencer(): Observable<any> {
    // called from photoes only for check WIP
    const url = environment.copmonentUrl.adminDashboard.ProductController.get_all_product_of_influencer;
    return this.httpService.get(url);
  }

  public getProductByMedia(): Observable<any> {
    // WIP
    const url = environment.copmonentUrl.adminDashboard.ProductController.get_product_by_media;
    return this.httpService.get(url);
  }

  public getMeasurements(): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.ProductController.measurements;
    return this.httpService.get(url);
  }
  public getSize(): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllSize;
    return this.httpService.get(url);
  }

  public getManageProfiles(page?, size?): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.append('page', page);
    }
    if (size !== undefined) {
      params = params.append('size', size);
    }
    const url = environment.copmonentUrl.adminDashboard.userController.get_all_manages_profile;
    return this.httpService.get(url, { params: params });
  }
  public getadminManageProfiles(page?, size?): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.append('page', page);
    }
    if (size !== undefined) {
      params = params.append('size', size);
    }
    const url = environment.copmonentUrl.adminDashboard.userController.get_all_admin_profile;
    return this.httpService.get(url, { params: params });
  }
  public changeMediaStatus(id, status): Observable<any> {
    let params = new HttpParams();
    params = params.append('mediaId', id);
    params = params.append('mediaStatus', status);
    //  const url = environment.copmonentUrl.adminDashboard.ProductController.changeMediaStatus + '?mediaId=' + id +'& mediaStatus=' + status;
    const url = environment.copmonentUrl.adminDashboard.ProductController.changeMediaStatus
    return this.httpService.get(url, { params: params });
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
  public uploadFile(file, media_type): Observable<any> {
    const formData: FormData = new FormData();
    let params = new HttpParams();
    formData.append(`files`, file, file.name);
    params = params.append('mediaType', media_type);
    const url = environment.copmonentUrl.influencerDashboard.fileUploadController.uploadFile;
    return this.httpService.post(url, formData, { params: params });
  }

  // for delete uploaded Image
  public deleteUploadedImage(mediaIds): Observable<any> {
    let url = environment.copmonentUrl.influencerDashboard.fileUploadController.deleteUploadedMedia;
    url = url + '?mediaIds='
    let mediaStr = '';
    mediaIds.forEach((element) => {
      if (mediaStr) {
        mediaStr = mediaStr + '&mediaIds=' + element;
      } else {
        mediaStr = element;
      }
    });
    return this.httpService.post(url + mediaStr, {});
  }
  public deleteProfileImage(id): Observable<any> {
    let url = environment.copmonentUrl.influencerDashboard.fileUploadController.deleteProfileMedia;
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpService.post(url, params);
  }
  public deleteProduct(productId) {
    let params = new HttpParams();
    params = params.append('productId', productId);
    const url = environment.copmonentUrl.adminDashboard.ProductController.deleteProduct;
    return this.httpService.delete(url, { params: params });
  }

  public getAllProductofAllInfluencersByCriteria(page, size?, mediatype?, categoryId?, sizeTag?, influencerId?): Observable<any> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.append('categoryId', categoryId);
    }
    if (influencerId) {
      params = params.append('influencerId', influencerId);
    }
    if (mediatype) {
      params = params.append('mediatype', mediatype);
    }
    params = params.append('page', page);
    params = params.append('size', size);
    // if (data.sizeTagOfProduct) {
    //   params = params.append('sizeTagOfProduct', data.sizeTagOfProduct);
    // }

    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllProductofAllInfluencersByCriteria;
    return this.httpService.get(url, { params: params });
  }
  public getAllProductofInfluencerOfLibraries(data): Observable<any> {
    let params = new HttpParams();
    if (data.searchKeyword) {
      params = params.append('searchKeyword', data.searchKeyword);
    }
    if (data.mediatype) {
      params = params.append('mediatype', data.mediatype);
    }
    if (data.influencerId) {
      params = params.append('influencerId', data.influencerId);
    }
    params = params.append('page', data.page);
    params = params.append('size', '12');
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllProductofAllInfluencersByCriteria;
    return this.httpService.get(url, { params: params });
  }
  public getAllProductofInfluencers(data): Observable<any> {
    let params = new HttpParams();
    if (data.categories && data.categories.length) {
      let cats = '';
      let cnt = data.categories.length;
      data.categories.forEach((el, index) => {
        cnt--;
        if (index == data.categories.length - 1) {
          cats = cats + el;
        } else {
          cats = cats + el + ',';
        }
        if (cnt == 0) {
          params = params.append('categoryIds', cats);
        }
      });
    }
    if (data.influencerId) {
      params = params.append('userId', data.influencerId);
    }
    if (data.searchKeyword) {
      params = params.append('searchKeyword', data.searchKeyword);
    }
    params = params.append('page', data.page);
    params = params.append('size', data.size);
    if (data.sizeTagOfProduct) {
      params = params.append('wearingSize', data.sizeTagOfProduct);
    }
    if (data.mediaStatus) {
      params = params.append('mediaStatus', data.mediaStatus);
    }
    if (data.type) {
      params = params.append('mediaType', data.type);
    }

    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllMedias;
    return this.httpService.get(url, { params: params });
  }
  //get All admin uploaded Data
  public getAllProductofAdmin(data): Observable<any> {
    let params = new HttpParams();
    if (data.categories && data.categories.length) {
      let cats = '';
      let cnt = data.categories.length;
      data.categories.forEach((el, index) => {
        cnt--;
        if (index == data.categories.length - 1) {
          cats = cats + el;
        } else {
          cats = cats + el + ',';
        }
        if (cnt == 0) {
          params = params.append('categoryIds', cats);
        }
      });
    }
    if (data.influencerId) {
      params = params.append('userId', data.influencerId);
    }
    if (data.searchKeyword) {
      params = params.append('searchKeyword', data.searchKeyword);
    }
    params = params.append('page', data.page);
    params = params.append('size', data.size);
    if (data.mediaStatus) {
      params = params.append('mediaStatus', data.mediaStatus);
    }
    if (data.sizeTagOfProduct) {
      params = params.append('wearingSize', data.sizeTagOfProduct);
    }
    if (data.type) {
      params = params.append('mediaType', data.type);
    }

    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllProductofAlladminByCriteria;
    return this.httpService.get(url, { params: params });
  }

  // get admin profiles
  public getAllAdminProfile(page?, size?): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.append('page', page);
    }
    if (size !== undefined) {
      params = params.append('size', size);
    }
    const url = environment.copmonentUrl.adminDashboard.userController.getAllAdminProfile;
    return this.httpService.get(url, { params: params });
  }

  //update profile status
  public updateProfileStatus(status, userId): Observable<any> {
    let params = new HttpParams();
    params = params.append('status', status);
    params = params.append('userIds', userId);
    const url = environment.copmonentUrl.adminDashboard.userController.updateProfileStatus;
    return this.httpService.get(url, { params: params });
  }

  //delete userprofile
  public deleteInfluencerById(userId): Observable<any> {
    let params = new HttpParams();
    params = params.append('userIds', userId);
    const url = environment.copmonentUrl.adminDashboard.userController.deleteInfluencerById;
    return this.httpService.delete(url, { params: params });
  }

  // edit userProfile
  public updateInfluencer(data): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.userController.updateInfluencer;
    return this.httpService.post(url, data);
  }
  // edit Admin
  public updateAdmin(data): Observable<any> {
    const url = environment.copmonentUrl.adminDashboard.userController.updateAdmin;
    return this.httpService.post(url, data);
  }

  //check media assosiate with product
  public checkMediaAssociateWithProduct(mediaId): Observable<any> {
    let params = new HttpParams();
    params = params.append('?mediaIds', mediaId);
    const url = environment.copmonentUrl.adminDashboard.ProductController.checkMediaAssociatewithProduct;
    return this.httpService.get(url + params, {});
  }
  // delete media
  public deleteMedia(mediaId): Observable<any> {
    const data = '?mediaIds=' + mediaId;
    const url = environment.copmonentUrl.adminDashboard.ProductController.deleteMedia;
    return this.httpService.post(url + data, {});
  }
  //search media
  public searchMedia(influencerId, page, searchKeyword, size, mediaType?): Observable<any> {
    let params = new HttpParams();
    if (influencerId !== undefined) {
      params = params.set('influencerId', influencerId);
    }
    params = params.set('page', page);
    params = params.set('searchKeyword', searchKeyword);
    params = params.set('size', size);
    if (mediaType !== undefined) {
      params = params.set('mediaType', mediaType);
    }
    const url = environment.copmonentUrl.adminDashboard.ProductController.search_media;
    return this.httpService.post(url, params)
  }
  // approve User Review
  public approveUserReview(reviewId, reviewStatus) {
    let params = new HttpParams();
    params = params.append('reviewId', reviewId);
    params = params.append('reviewStatus', reviewStatus);
    const url = environment.copmonentUrl.ReviewController.approveUserReview;
    return this.httpService.get(url, { params: params });
  }

  public getAllReview(page, size) {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
    const url = environment.copmonentUrl.ReviewController.getAllReview;
    return this.httpService.get(url, { params: params });
  }
  // public getReviewById(reviewId?) {
  //     let params = new HttpParams();
  //     if(reviewId !== undefined){
  //         params = params.append('reviewId', reviewId);
  //     }
  //     const url = environment.copmonentUrl.ReviewController.getReviewById;
  //     return this.httpService.get(url, { params: params });
  // }
  // public getReviewByProductId(productId) {
  //     let params = new HttpParams();
  //     params = params.append('reviewId', productId);
  //     const url = environment.copmonentUrl.ReviewController.getReviewById;
  //     return this.httpService.get(url, { params: params });
  // }
  //  public deleteReviewById(reviewId) {
  //     let params = new HttpParams();
  //     params = params.append('reviewId', reviewId);
  //     const url = environment.copmonentUrl.ReviewController.deleteReviewById;
  //     return this.httpService.get(url, { params: params });
  // }

  public getSizeChart(sizeChartId?) {
    let params = new HttpParams();
    if (sizeChartId !== undefined) {
      params = params.append('sizeChartId', sizeChartId);
    }
    const url = environment.copmonentUrl.adminDashboard.sizeChartController.getSizeChartById;
    return this.httpService.get(url, { params: params });
  }
  //most popular size data
  public getAllSizeData() {
    const url = environment.copmonentUrl.adminDashboard.sizeChartController.getAllSizeData;
    return this.httpService.get(url);
  }
  //till not used
  public getUserById(userId) {
    let params = new HttpParams();
    params = params.append('userId', userId);
    const url = environment.copmonentUrl.adminDashboard.userController.getUserById;
    return this.httpService.get(url, { params: params });
  }
  //Based on Email Admin Data
  public getUserByEmail(email) {
    let params = new HttpParams();
    params = params.append('email', email);
    const url = environment.copmonentUrl.adminDashboard.userController.getUserByEmail;
    return this.httpService.get(url, { params: params });
  }
  //SearchInflunecer
  public searchInfluencer(searchValue) {
    let params = new HttpParams();
    params = params.append('searchKeyword', searchValue);
    const url = environment.copmonentUrl.adminDashboard.userController.searchInfluencer;
    return this.httpService.get(url, { params: params });
  }

  public getAgeData(obj?) {
    let params = new HttpParams();
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAgeData;
    if (obj.toDate && obj.fromDate) {
      let tempToDate = new Date(obj.toDate);
      let tempFromDate = new Date(obj.fromDate);
      let dateHashMap = {

      }

      params = params.append('date', (tempFromDate.getFullYear() + '-' + (tempFromDate.getMonth() + 1) + '-' + tempFromDate.getDate()));
      params = params.append('toDate', (tempToDate.getFullYear() + '-' + (tempToDate.getMonth() + 1) + '-' + tempToDate.getDate()));
      return this.httpService.get(url, { params: params });
    } else {
      return this.httpService.get(url);
    }
  }

  public generateReport(type) {
    let params = new HttpParams();
    params = params.append('selectBy', type);
    const url = environment.copmonentUrl.adminDashboard.ProductController.generateReport;
    return this.httpService.get(url, { params: params });
  }
  public getAllInfluencers() {
    let params = new HttpParams();
    params = params.append('role', 'INFLUENCER');
    const url = environment.copmonentUrl.adminDashboard.userController.getAllUserByRole;
    return this.httpService.get(url, { params: params });
  }
  public getBodyTypes() {
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllBodytype;
    return this.httpService.get(url);
  }
  public getAllMediaStatus() {
    const url = environment.copmonentUrl.adminDashboard.ProductController.getAllMediaStatus;
    return this.httpService.get(url);
  }

}
