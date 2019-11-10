function MainCtrl($scope, $state, $auth, $rootScope, $http, $uibModal, userLogout, generalFunction) {

    $scope.navBarTemplateUrl = '../../components/navigationBar/navbar.html';
    $scope.footerUrl = '../../components/footer/footer.html';
    $scope.isIgnoreNavBar = true;
    $scope.isNavOpened = false;


    $scope.openNav = openNav;
    $scope.closeNav = closeNav;
    $scope.toggleMenu = toggleMenu;



    function openNav() {
        console.log('opening');
        $scope.isNavOpened = true;

        $("#mySidenav").css("width", "300px");
        $("#navHamburger").css("opacity", "1");
        $(".backdrop").css("opacity", "1");
        $(".backdrop").css("display", "block");

        $("#navFlower").css("transform", "rotate(120deg)");
        checkHamburgerIcon();
    }

    function closeNav() {
        $scope.isNavOpened = false;
        console.log('closing');
        $("#mySidenav").css("width", "350px");
        setTimeout(function () {
            $("#mySidenav").css("width", "0");
        }, 200);
        setTimeout(function () {
            checkHamburgerIcon();
        }, 500);

        $("#navFlower").css("transform", "rotate(0deg)");




        $(".backdrop").css("opacity", "0");
        $(".backdrop").css("display", "none");

    }

    function toggleMenu() {
        $scope.isNavOpened = $(".hamburgerIcon").hasClass("cross");

        ($scope.isNavOpened) ? closeNav() : openNav();
        $(".hamburgerIcon").toggleClass("cross");
    }

    function checkHamburgerIcon() {
        console.log('isNavOpened ' + $scope.isNavOpened);
        if ($(this).scrollTop() >= 0 && $scope.isNavOpened == true) {
            $('#navHamburger').show();
        } else {
            $('#navHamburger').hide();
        }
    }

    function animateCannisFlowerAndHamper() {
        console.log("removing class go");


        setTimeout(function () {
            $(".welcome-word").css("opacity", "1");
            $("#introName").removeClass("go");
        }, 500);

        setTimeout(function () {
            console.log("adding class go");
            $('#introName').addClass('go');
        }, 1000);

        setTimeout(function () {
            $("#introName").css("opacity", "1");
        }, 1100);

        setTimeout(function () {
            $(".welcome-word").addClass('welcome-animate');
        }, 1500);

        setTimeout(function () {
            $(".welcome-word").removeClass('welcome-animate');
            $("#introName").css("opacity", "0");
            $(".welcome-word").css("opacity", "0");
        }, 4500);
    }

    function initialize() {

        checkHamburgerIcon();
        animateCannisFlowerAndHamper();

        setInterval(function () {
            animateCannisFlowerAndHamper();
        }, 5500);

        $(function () {
            $(window).scroll(function () {
                checkHamburgerIcon();
            });
        });
    }

    initialize();

    $scope.$on('ignoreNavbarActionChanged', function (event, yesOrNo) {
        $scope.isIgnoreNavBar = yesOrNo;

    });

    $scope.$on('hamburgerColorChanged', function (event, color) {
        $('.hamburgerMain').css('stroke', color + ' !important');
    });




}

MainCtrl.$inject = [
    '$scope', '$state', '$auth', '$rootScope', '$http', '$uibModal', 'userLogout', 'generalFunction'
];

angular.module('cannis')
    .controller('MainCtrl', MainCtrl);