angular
.module('mannRoboWeb', ['ngMaterial'])
.controller('MainCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $log) {
    //$scope.hello = 'yello';
    $scope.toggleNav = buildToggler('left');
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

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }
}).controller('navCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('left').close()
            .then(function () {
//              $log.debug("close LEFT is done");
            });
    };
}
).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .warnPalette('red')
    .backgroundPalette('grey');
});