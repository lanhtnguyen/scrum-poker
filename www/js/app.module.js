var app = angular.module('pkr', ['ionic', 'pkr.main', 'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('AppCtrl', function($scope, $cordovaCamera, $ionicModal) {
    
    $scope.createModal = function(){
      $ionicModal.fromTemplateUrl('templates/selection.html', {
        scope: this,
        animation: 'slide-in-up',
        keyboard: true,
      }).then(function(modal) {
        $scope.modal = modal;
      })
    }   
   
   
    $scope.createModal();

    $scope.takeImage = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }


    $scope.showModal = function(n){
      $scope.modal.show(n);
      $scope.selectedNumber = n;
    }

    $scope.closeModal = function(){
      $scope.modal.hide();
    }



  //   $scope.selectNumber = function(e){
  //       e.preventDefault();

  //       $scope.number.modal('hide')
  //           .on('hidden.bs.modal', function (e) {
  //               $('selection').modal('show');
  //               $(this).off('hidden.bs.modal');
  //           });

  //   };


  })

  

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })


      .state('app.main', {
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })


      // .state('app.modal', {
      // url: '/app',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/selection.html',
      //       controller: 'AppCtrl'
      //     }
      //   }
      // })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
  });
