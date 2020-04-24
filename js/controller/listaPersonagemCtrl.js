angular.module("listaPersonagem").controller("listaPersonagemCtrl", ['$scope', '$http', function ($scope, $http) {
    console.log($scope.$id);
    $scope.personagens = [];
    $scope.buttonPrev = 'page-item disabled';
    $scope.buttonNext = 'page-item';
    $scope.pages = [];
    $scope.totalPage = 0;
    $scope.currentPage = 0;
    $scope.loadingPersonagem = function (searchPers) {
        $http.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=03a6fcc8f06eb2cb4609b965e64597f2&hash=fe362023656348446b7e0a931b6506a2', { params: searchPers }).then(function (data) {
            $scope.pages = [];
            $scope.currentPage = 0;
            $scope.personagens = data.data.data;
            $scope.totalPage = Math.ceil(data.data.data.total / data.data.data.limit);
            for (i = 0; i < $scope.totalPage; i++) {
                $scope.pages.push({ numberPage: i, offset: 20 * i });
            }
            $scope.statButtonPage($scope.currentPage)
        });
    };
    $scope.pagination = function (varOffset, varCurrentPage, searchPers) {
        $scope.currentPage = varCurrentPage;
        var paramsPage = { offset: varOffset };
        angular.merge(paramsPage, searchPers);
        $http.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=03a6fcc8f06eb2cb4609b965e64597f2&hash=fe362023656348446b7e0a931b6506a2', { params: paramsPage }).then(function (data) {
            $scope.personagens = data.data.data;
            $scope.statButtonPage($scope.currentPage)
        });
    };
    $scope.statButtonPage = function (varCurrentPage) {
        $scope.limitPage = 5;
        if (varCurrentPage > 5) {
            $scope.limitStartPage = varCurrentPage - 5;
        }
        else {
            $scope.limitStartPage = 0;
        }
        if (varCurrentPage > 5) {
            $scope.limitPage = 5;
        }
        else {
            $scope.limitPage = 10 - varCurrentPage;
        }
        if (varCurrentPage == 0) {
            $scope.buttonPrev = 'page-item disabled';
        }
        else {
            $scope.buttonPrev = 'page-item';
        }
        if (varCurrentPage == $scope.totalPage - 1) {
            $scope.buttonNext = 'page-item disabled';
        }
        else {
            $scope.buttonNext = 'page-item';
        }
    };
    $scope.loadingPersonagem();
}]);