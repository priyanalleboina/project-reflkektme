// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_PATH: 'http://104.211.177.91:8080/reflektme',
  copmonentUrl: {
    login: {
      login: 'login',   //Done
      activateUser: 'update-status-email-verification',  //token
      changePassword: 'change_password',
      forgotPassword: 'forget_password',            // Done
      tempLogin: 'temp-login',
      verifyToken: 'verify-token',
    },
    logout: {
      logout: 'logout-user'
    },
    adminDashboard: {
      CategoryController: {
        findallcategory: 'findallcategory',       // Done
        updatesizevalue: 'updatesizevalue'        // Done
      },
      ProductController: {
        create_product: 'save_product',   // Done
        get_all_product_of_influencer: 'get_all_product_of_influencer',
        get_product_by_media: 'get_product_by_media',   //Done
        measurements: 'measurements',      // Done
        search_media: 'search-media', //changed url
        update_product: 'update_product',   //Done
        changeMediaStatus: 'change_media_status',    //done
        getAllMediaOfInfluencer: 'get_all_media_of_influencer', //Done
        getAllMediaByInfluencerAndMediaType: 'get_media_by_influenecr_and_media_type',   //done
        findProductByMedia: 'find_product_by_media_id',  //done
        getAllProductofAllInfluencersByCriteria: 'get-all-product-of-influencers', // Done
        deleteProduct: 'delete-product',
        deleteMedia: 'delete-media-by-id',   //Done,
        checkMediaAssociatewithProduct: 'check-media-associated-with-product',
        getAllMedias: 'search-media-with-filter',
        getAllSize: 'get-all-size-value',
        getAgeData: 'get-age-data',
        generateReport: 'generate-report',
        getAllBodytype: 'get-all-bodytype',
        getAllProductofAlladminByCriteria: 'upload-media-section-with-filter',
        getAllMediaStatus: 'get-all-media-status'
      },
      userController: {
        get_all_manages_profile: 'get_all_manages_profile',  //Done
        get_all_admin_profile: 'get_all_admin_profile',
        change_password: 'change_password',
        createinfluencer: 'createinfluencer',  // Done
        forget_password: 'forget_password',
        passwordgenerator: 'passwordgenerator',   // Done
        getAllAdminProfile: 'get_all_admin_profile',  //Done
        updateProfileStatus: 'update_status',  //Done
        deleteInfluencerById: 'deleteinfluencer',
        updateInfluencer: 'updateinfluencer',
        getUserById: 'get-user-by-id',
        getUserByEmail: 'get-user-by-email',
        updateAdmin: 'update-admin-profile',
        getAllUserByRole: 'get-all-user-by-role',
        searchInfluencer: 'search-influencer',
        createadmin: 'create-admin',
      },
      sizeChartController: {
        getSizeChartById: 'get-size-chart',
        getAllSizeData: 'get-all-size-data'   //...most popular size //Done
      }
    },
    ReviewController: {
      approveUserReview: 'approve-user-review',  //Done
      deleteReviewById: 'delete-review-by-id',
      getReviewById: 'get-review-by-id',
      getReviewByProductId: 'get-review-by-product-id',
      getReviewByUserId: 'get-review-by-user-id',
      createReview: 'save-review',
      getAllReview: 'get-all-reviews'  //Done
    },
    influencerDashboard: {
      fileUploadController: {
        multipleImageUpload: 'upload-multiple-media', //Done
        deleteUploadedMedia: 'delete-media-by-id',
        uploadFile: 'upload-media',  //Done
        deleteProfileMedia: 'delete-profile-image-by-id',
      }
    },
    reflektTool: {
      GuestUserController: {
        createGuestUser: 'create-guest-user',  //Done
        getAllGuestUser: 'list-all-guest-user',
        templogin: 'temp-login'
      },
      ReflektmeToolController: {
        getAllMediaProduct: 'get-all-media-product',
        getProductByCategory: 'get-all-media-product-by-category',
        createCustomer: 'create-customer',   //Done
        updateCustomer: 'update-customer',
        saveCustomerMeasurements: 'save-customer-measurements',
        getAllSize: 'get-all-size-value',
        getProductByURLAndSize: 'get-all-media-by-producturl-and-size',
        getProductByProductURL: 'get-product-by-producturl',
        getMeasurementdetailByMedia: 'get-measurementdetail-by-media',
        getCustomerMeasurements: 'get-customer-measurements',
        getReviewByUserId: 'get-review-by-product-url',
        saveReview: 'save-review',
        findProductByMedia: 'find_product_by_media_id',
        getProductReview: 'get-review-by-producturl',
        getProductRecommendation: 'get-product-recommendation',
        viewAllProducts: 'view-all-recommendation',
        checkEcommerceToken: 'check-ecommerce-token',
        customerLogin: 'customer-login'
      },
      BrandController: {
        createBrand: 'create-brand',
        deleteBrandById: 'delete-brand-by-id',
        getAllBrands: 'get-all-brands',          //Done
        getBrandByProduct: 'get-brand-by-product'
      }
    }
  }
};
