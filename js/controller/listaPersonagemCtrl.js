angular.module("listaPersonagem").controller("listaPersonagemCtrl", ['$scope', '$http', 'marvelAPI', 'paginationService', function ($scope, $http, marvelAPI, paginationService) {
    $scope.personagens = [];
    $scope.buttonPrev = 'page-item disabled';
    $scope.buttonNext = 'page-item';
    $scope.pages = [];
    $scope.totalPage = 0;
    $scope.currentPage = 0;
    $scope.loadingPersonagem = function (searchPers) {
        marvelAPI.getPersonagem(searchPers).then(function (data) {
            $scope.pages = [];
            $scope.currentPage = 0;
            $scope.personagens = data.data.data;
            $scope.totalPage = Math.ceil(data.data.data.total / data.data.data.limit);
            for (i = 0; i < $scope.totalPage; i++) {
                $scope.pages.push({ numberPage: i, offset: 20 * i });
            }
            $scope.configButtonPage();
        });
    };
    $scope.pagination = function (varOffset, varCurrentPage, searchPers) {
        $scope.currentPage = varCurrentPage;
        var paramsPage = { offset: varOffset };
        angular.merge(paramsPage, searchPers);
        marvelAPI.getPersonagem(paramsPage).then(function (data) {
            $scope.personagens = data.data.data;
        });
        $scope.configButtonPage();
    };
    $scope.configButtonPage = function () {
        $scope.startPage = paginationService.startPage($scope.currentPage);
        $scope.limitPage = paginationService.limitPage($scope.currentPage);
        $scope.buttonPrev = paginationService.classButtonPrevPage($scope.currentPage);
        $scope.buttonNext = paginationService.classButtonNextPage($scope.currentPage, $scope.totalPage);
    };
    $scope.loadingPersonagem();
}]);