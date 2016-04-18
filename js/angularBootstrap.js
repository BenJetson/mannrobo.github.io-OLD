var app = angular.module('mannRoboWeb', ['ngMaterial']);

app.controller('MainCtrl', function($scope, $timeout, $mdSidenav, $mdMedia, $log, $http, pageParameters) {
    
    $scope.params = pageParameters.getParameters();
    
//    $http.get("files/pageParamDefaults.json").then(function(response) {
//        for (key in response.data) {
//            if (!(key in $scope.params)) { 
//                $scope.params[key] = response.data[key]
//                $log.debug($scope.params);
//            };
//        };
//    });
    
    $scope.toggleNav = function(){
        if (!$mdMedia('gt-sm')) {
            $mdSidenav('left').toggle()
        }
    };
    
    $scope.isNavOpen = function() {
        return $mdSidenav('left').isOpen();
    };
    
    $scope.browserBack= function(){window.history.back();};
    
});

app.service('pageParamCheck', function($log) {
    return {
        validate: function(currentParameters) {
            defaultParameters = {
                pageTitle : "Mann Robotics",
                hideBack : true,
                hideMenu : false,
                titleInTab : true
            };
            
            for (key in defaultParameters) {
                if (!(key in currentParameters)) { 
                    currentParameters[key] = defaultParameters[key]
                };
            };
            
            return currentParameters;
                
        }
    }
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
    .warnPalette('red');
});

//app.config(function($mdThemingProvider) {
//    var customPrimary = {
//        '50': '#9acffa',
//        '100': '#82c4f8',
//        '200': '#6ab8f7',
//        '300': '#51adf6',
//        '400': '#39a1f4',
//        '500': '#2196F3',
//        '600': '#0d8aee',
//        '700': '#0c7cd5',
//        '800': '#0a6ebd',
//        '900': '#0960a5',
//        'A100': '#b2dbfb',
//        'A200': '#cae6fc',
//        'A400': '#e3f2fd',
//        'A700': '#08528d',
//        'contrastDefaultColor': 'light'
//    };
//    $mdThemingProvider
//        .definePalette('customPrimary', 
//                        customPrimary);
//
//    var customAccent = {
//        '50': '#6d5200',
//        '100': '#866500',
//        '200': '#a07800',
//        '300': '#b98b00',
//        '400': '#d39e00',
//        '500': '#ecb100',
//        '600': '#ffc720',
//        '700': '#ffce3a',
//        '800': '#ffd453',
//        '900': '#ffda6d',
//        'A100': '#ffc720',
//        'A200': '#FFC107',
//        'A400': '#ecb100',
//        'A700': '#ffe186',
//        'contrastDefaultColor': 'light'
//    };
//    $mdThemingProvider
//        .definePalette('customAccent', 
//                        customAccent);
//
//    var customWarn = {
//        '50': '#ffd1d1',
//        '100': '#ffb8b8',
//        '200': '#ff9e9e',
//        '300': '#ff8585',
//        '400': '#ff6b6b',
//        '500': '#FF5252',
//        '600': '#ff3838',
//        '700': '#ff1f1f',
//        '800': '#ff0505',
//        '900': '#eb0000',
//        'A100': '#ffebeb',
//        'A200': '#ffffff',
//        'A400': '#ffffff',
//        'A700': '#d10000',
//        'contrastDefaultColor': 'light'
//    };
//    $mdThemingProvider
//        .definePalette('customWarn', 
//                        customWarn);
//
//    var customBackground = {
//        '50': '#ffffff',
//        '100': '#ffffff',
//        '200': '#ffffff',
//        '300': '#ffffff',
//        '400': '#fbfbfb',
//        '500': '#eeeeee',
//        '600': '#e1e1e1',
//        '700': '#d4d4d4',
//        '800': '#c8c8c8',
//        '900': '#bbbbbb',
//        'A100': '#ffffff',
//        'A200': '#ffffff',
//        'A400': '#ffffff',
//        'A700': '#aeaeae'
//    };
//    $mdThemingProvider
//        .definePalette('customBackground', 
//                        customBackground);
//
//   $mdThemingProvider.theme('default')
//       .primaryPalette('customPrimary')
//       .accentPalette('customAccent')
//       .warnPalette('customWarn')
//       .backgroundPalette('customBackground')
//});