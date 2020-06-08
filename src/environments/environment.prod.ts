export const environment = {
  production: true,
  API_PATH: 'http://104.211.177.91:8080/reflektme',
  copmonentUrl: {
    login: {
      login: 'login',
      activateUser: 'update-status-email-verification',
      changePassword: 'change_password',
      forgotPassword: 'forget_password',  // done
      tempLogin: 'temp-login',
      verifyToken: 'verify-token'
    },
    logout: {
      logout: 'logout-user'
    },
    adminDashboard: {
      CategoryController: {
        findallcategory: 'findallcategory',       // done
        updatesizevalue: 'updatesizevalue'        // done
      },
      ProductController: {
        create_product: 'save_product',   // done
        get_all_product_of_influencer: 'get_all_product_of_influencer',
        get_product_by_media: 'get_product_by_media',
        measurements: 'measurements',      // Done
        search_media: 'search_media',
        update_product: 'update_product',
        changeMediaStatus: 'change_media_status',
        getAllMediaOfInfluencer: 'get_all_media_of_influencer',
        getAllMediaByInfluencerAndMediaType: 'get_media_by_influenecr_and_media_type',
        findProductByMedia: 'find_product_by_media_id',
        getAllProductofAllInfluencersByCriteria: 'get-all-product-of-influencers',
        deleteProduct: 'delete-product',
        deleteMedia: 'delete-media-by-id',
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
        get_all_manages_profile: 'get_all_manages_profile',
        get_all_admin_profile: 'get_all_admin_profile',
        change_password: 'change_password',
        createinfluencer: 'createinfluencer',  // Done
        forget_password: 'forget_password',
        passwordgenerator: 'passwordgenerator',   // Done
        getAllAdminProfile: 'get_all_admin_profile',
        updateProfileStatus: 'update_status',
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
        getAllSizeData: 'get-all-size-data'   //...most popular size
      }
    },
    ReviewController: {
      approveUserReview: 'approve-user-review',
      deleteReviewById: 'delete-review-by-id',
      getReviewById: 'get-review-by-id',
      getReviewByProductId: 'get-review-by-product-id',
      getReviewByUserId: 'get-review-by-user-id',
      createReview: 'save-review',
      getAllReview: 'get-all-reviews'
    },
    influencerDashboard: {
      fileUploadController: {
        multipleImageUpload: 'upload-multiple-media',
        deleteUploadedMedia: 'delete-media-by-id',
        uploadFile: 'upload-media',
        deleteProfileMedia: 'delete-profile-image-by-id',
      }
    },
    reflektTool: {
      GuestUserController: {
        createGuestUser: 'create-guest-user',
        getAllGuestUser: 'list-all-guest-user',
        templogin: 'temp-login'
      },
      ReflektmeToolController: {
        getAllMediaProduct: 'get-all-media-product',
        getProductByCategory: 'get-all-media-product-by-category',
        createCustomer: 'create-customer',
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
        viewAllProducts:'view-all-recommendation',
        checkEcommerceToken: 'check-ecommerce-token',
        customerLogin: 'customer-login'
      },
      BrandController: {
        createBrand: 'create-brand',
        deleteBrandById: 'delete-brand-by-id',
        getAllBrands: 'get-all-brands',
        getBrandByProduct: 'get-brand-by-product'
      }
    }
  }
};
