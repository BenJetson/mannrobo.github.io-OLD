var app = angular.module('mannRoboWeb', ['ngMaterial']);

app.controller('MainCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $log) {
    //$scope.hello = 'yello';
    $scope.toggleNav = function(){$mdSidenav('left').toggle()};
    $scope.isNavOpen = function() {
        return $mdSidenav('left').isOpen();
    }
    
    $scope.menu = [
        {
            text: 'Home',
            href: "index.html",
            icon: "home"
        },
        {
            text: 'About Us',
            href: 'about.html',
            icon: 'people'
        },
        {
            text: 'Gallery',
            href: 'gallery.html',
            icon: 'photo'
        },
        {
            text: 'News',
            href: 'news.html',
            icon: 'chrome_reader_mode'
        },
        {
            text: 'Calendar',
            href: 'calendar.html',
            icon: 'today'
        },
        {
            text: 'Resources',
            href: 'resources.html',
            icon: 'book'
        }
    ];
    
    $scope.lowerMenu = [
        {
            text: 'Contact Us',
            href: 'contact.html',
            onclick: 'return true;',
            icon: 'email'
        },
        {
            text: 'Settings',
            onclick: 'settingsHandler();',
            icon: 'settings'
        }
    ];
    
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