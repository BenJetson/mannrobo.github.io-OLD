var app = angular.module('mannRoboWeb', ['ngMaterial']);

app.controller('MainCtrl', function($scope, $timeout, $mdSidenav, $mdMedia, $log, $http) {
    //$scope.hello = 'yello';
    $scope.toggleNav = function(){$mdSidenav('left').toggle()};
    $scope.isNavOpen = function() {
        return $mdSidenav('left').isOpen();
    }
    
    $log.debug($mdMedia('gt-md'));
    
});

app.controller('menuCtrl', function($scope, $mdSidenav, $mdDialog, $http, $log) {
    
    $http.get("files/menu.json").then(function(response) {
        $scope.menu = response.data;
    });
    
    $scope.settingsHandler = function($scope) {
        $mdDialog.show(
            $mdDialog.alert({
                title: 'Settings',
                textContent: 'Settings has been disabled while site configuration is in progress. ' + 
                             'Check back later.',
                ok: 'close'
            })
        );
    };
    
});

// Set the Material Theme.
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .warnPalette('red')
    .backgroundPalette('grey');
});