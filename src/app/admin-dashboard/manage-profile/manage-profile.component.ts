import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AdminDashboardService } from '../service/admin-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MediaType, UserRole } from 'src/app/constants/enum';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageProfileComponent implements OnInit {
  profileData: any;
  profileArr: any = [];
  fileUploade: any;
  mediaTypeEnum: any;
  userStatus: any;
  slectedUsersList: any = [];
  singleUserId: any;
  selectAllCheckbox: boolean;
  fnamevalid: boolean;
  checkStatus: boolean;
  statusArr: any = [];
  userRoleEnum: any;
  roles: any;
  // influencerProfile: any = [];
  constructor(private toastrService: ToastrService,
    private cd: ChangeDetectorRef,
    private adminDashboardService: AdminDashboardService,
    private DataService: DataService, ) {
    this.mediaTypeEnum = new MediaType();
    this.userRoleEnum = new UserRole();

  }

  ngOnInit() {
    this.profileData = [];
    this.manageProfiles();
    this.DataService.setSearchBar(true);
    this.profileSearch();
  }
  profileSearch() {
    this.DataService.searchProfile.subscribe(res => {
      let searchvalue = res;
      if (searchvalue == '') {
        this.manageProfiles();
      }
      else {
        this.adminDashboardService.searchInfluencer(searchvalue).subscribe((res) => {
          this.profileData = res['data'];
        },
          (err) => {
            this.toastrService.error(JSON.stringify(err.message));
          });
      }
    })
  }
  manageProfiles(page?, size?) {
    const jwt = localStorage.getItem('loginToken');
    this.roles = localStorage.getItem('userRole');
    if (jwt && this.roles === this.userRoleEnum.roleSuperAdmin) {
      this.adminDashboardService.getadminManageProfiles(page, size).subscribe((result: any) => {
        if (result.status === 200) {
          //  this.influencerProfile = JSON.parse(JSON.stringify(result.data.data));
          //  this.adminProfile();
          this.profileData = JSON.parse(JSON.stringify(result.data.data));
          if (this.profileData && this.profileData.length) {
            let profileObj: any = {};
            this.profileData.forEach(element => {
              element.isEditProfile = false;
              profileObj.firstName = element.firstName;
              profileObj.lastName = element.lastName;
              profileObj.role = element.role.role;
              profileObj.email = element.email;
              profileObj.status = (element.status).replace(/_/g, ' ');
              this.profileArr.push(profileObj);
              profileObj = {};
            });
            this.cd.detectChanges();
          }
          // console.log(this.profileArr);
        }
      },
        (error) => {
          this.toastrService.error(JSON.stringify(error.message));
        });
    }
    else {
      this.adminDashboardService.getManageProfiles(page, size).subscribe((result: any) => {
        if (result.status === 200) {
          //  this.influencerProfile = JSON.parse(JSON.stringify(result.data.data));
          //  this.adminProfile();
          this.profileData = JSON.parse(JSON.stringify(result.data.data));
          if (this.profileData && this.profileData.length) {
            let profileObj: any = {};
            this.profileData.forEach(element => {
              element.isEditProfile = false;
              profileObj.firstName = element.firstName;
              profileObj.lastName = element.lastName;
              profileObj.role = element.role.role;
              profileObj.email = element.email;
              profileObj.status = (element.status).replace(/_/g, ' ');
              this.profileArr.push(profileObj);
              profileObj = {};
            });
            this.cd.detectChanges();
          }
          // console.log(this.profileArr);
        }
      },
        (error) => {
          this.toastrService.error(JSON.stringify(error.message));
        });

    }
  }
  selectAll(e) {
    if (e.target.checked === true) {
      for (var i = 0; i < this.profileData.length; i++) {
        this.profileData[i].checked = true;
        this.slectedUsersList.push(this.profileData[i].userId);
        this.statusArr.push(this.profileData[i].status);
      }
    }
    else {
      for (var i = 0; i < this.profileData.length; i++) {
        this.profileData[i].checked = false;
        if (this.slectedUsersList[i] == e.userId) {
          this.slectedUsersList.splice(i, 1);
        }
        if (this.statusArr[i] == e.status) {
          this.statusArr.splice(i, 1);
        }
        this.slectedUsersList = [];
        this.statusArr = [];
      }
    }
  }

  // adminProfile(page?, size?) {
  //   this.adminDashboardService.getAllAdminProfile(page, size).subscribe((result: any) => {
  //     if (result.status === 200) {
  //       this.profileData = this.influencerProfile.concat(JSON.parse(JSON.stringify(result.data.data)));
  //       if (this.profileData && this.profileData.length) {
  //         let profileObj: any = {};
  //         this.profileData.forEach(element => {
  //           element.isEditProfile = false;
  //           profileObj.firstName = element.firstName;
  //           profileObj.role = element.role.role;
  //           profileObj.email = element.email;
  //           profileObj.status = (element.status).replace(/_/g, ' ');
  //           this.profileArr.push(profileObj);
  //           profileObj = {};
  //         });
  //       }
  //     }
  //   },
  //     (error) => {
  //       this.toastrService.error(JSON.stringify(error.message));
  //     });
  // }
  firstNameValidn(e) {
    if (e.target.validity.valid) {
      this.fnamevalid = false;
    } else {
      this.fnamevalid = true;
    }
  }
  lastNameValidn(e) {
    if (e.target.validity.valid) {
      this.fnamevalid = false;
    } else {
      this.fnamevalid = true;
    }
  }
  saveEditedProfile(userId, i) {
    if (this.profileData && this.profileData.length) {
      this.profileData.forEach(element => {
        element.isEditProfile = false
        if (element.userId === userId) {
          //   let saveEditData: any = {};
          // console.log('element===='+ JSON.stringify(element))
          element.firstName = this.profileArr[i].firstName;
          element.lastName = this.profileArr[i].lastName;
          element.role.role = this.profileArr[i].role;
          element.email = this.profileArr[i].email;
          element.status = this.profileArr[i].status.replace(/ /g, '_');

          // saveEditData.userId = userId;
          // saveEditData.firstName = this.profileArr[i].firstName;
          // saveEditData.lastName = element.lastName;
          // saveEditData.username = element.username;
          // saveEditData.email = this.profileArr[i].email;
          // saveEditData.media = element.media;
          this.editUserProfile(element);
        }
      });
    }
  }

  uploadFile(event: any, userId) {
    var ext = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
    if (ext === 'jpeg' || ext === 'png') {
      this.adminDashboardService.uploadFile(event.target.files[0], this.mediaTypeEnum.profileImage).subscribe(
        (result) => {
          if (result.status === 200) {
            this.profileData.forEach(element => {
              if (element.userId === userId) {
                element.media = result.data;
              }
            });
          }
        },
        (error) => {
          this.toastrService.error(JSON.stringify(error));
        });
    } else {
      this.toastrService.warning('Image should be png or jpeg file');
    }
  }

  // ??????????
  deleteProduct(productId) {
    this.adminDashboardService.deleteProduct(productId).subscribe((result: any) => {
      if (result.status === 200) {
        this.toastrService.success('Product deleted');
      } else {
        this.toastrService.error(result.message);
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  deletesingleProfile(userId) {
    this.singleUserId = userId;
  }
  slectdata(e, event) {
    // //this.arr.push(e);
    // console.log(e, event, this.profileData);
    if (event.target.checked) {
      this.slectedUsersList.push(e.userId);
      this.statusArr.push(e.status);
    } else {
      for (let i in this.slectedUsersList) {
        if (this.slectedUsersList[i] == e.userId) {
          this.slectedUsersList.splice(i, 1);
        }
        if (this.statusArr[i] == e.status) {
          this.statusArr.splice(i, 1);
        }
      }
    }
    // console.log(this.slectedUsersList);
  }

  updateProfileStatus(status, userId) {
    this.adminDashboardService.updateProfileStatus(status, userId).subscribe((result: any) => {
      if (result.status === 200) {
        this.toastrService.success('Status changed successfully');
        this.slectedUsersList = [];
        this.manageProfiles();
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  updateUsersListStatus(userStatus) {
    let sts = this.statusArr.find(x => x == 'INVITATION_SENT');
    if (sts) {
      this.checkStatus = true;
      this.toastrService.error("You can not perform this operation as it contain the status as Invitation sent");
    }
    else {
      this.checkStatus = false;
    }
    if (this.checkStatus == false) {
      this.adminDashboardService.updateProfileStatus(userStatus, this.slectedUsersList).subscribe((result: any) => {
        if (result.status === 200) {
          this.toastrService.success('Status changed successfully');
          this.slectedUsersList = [];
          this.statusArr = [];
          this.manageProfiles();
          this.selectAllCheckbox = false;
        }
      },
        (error) => {
          this.toastrService.error(JSON.stringify(error.message));
        });
    }

  }
  deleteUserProfile() {
    if (this.singleUserId != undefined) {
      this.slectedUsersList.push(this.singleUserId);
    }
    // let array: any = Array.from(new Set(this.arr));
    // console.log(array);
    this.adminDashboardService.deleteInfluencerById(this.slectedUsersList).subscribe((result: any) => {
      if (result.status === 200) {
        this.toastrService.success('Profile deleted successfully');
        this.slectedUsersList = [];
        this.selectAllCheckbox = false;
        this.manageProfiles();
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }

  editUserProfile(userProfile) {
    // let data :any = {};
    // data.userId = userProfile.userId;
    // data.firstName = userProfile.firstName;
    // data.lastName = userProfile.lastName;
    // data.username = userProfile.username;
    // data.email = userProfile.email;
    // data.media = userProfile.media;
    this.adminDashboardService.updateInfluencer(userProfile).subscribe((result: any) => {
      if (result.status === 200) {
        this.toastrService.success('Profile updated successfully');
        this.manageProfiles();
        this.selectAllCheckbox = false;
      }
    },
      (error) => {
        this.toastrService.error(JSON.stringify(error.message));
      });
  }
  editProfile(profile, i) {
    this.fnamevalid = false;
    this.profileData.forEach(element => {
      if (element.userId === profile.userId) {
        this.profileArr[i].firstName = profile.firstName;
        this.profileArr[i].lastName = profile.lastName;
        element.isEditProfile = true;
      } else {
        element.isEditProfile = false;
      }
    });
  }
  ngOnDestroy() {
    this.DataService.setSearchBar('');
  }
}
