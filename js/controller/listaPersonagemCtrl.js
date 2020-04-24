angular.module("listaPersonagem").controller("listaPersonagemCtrl", ['$scope', '$http', function ($scope, $http) {
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
            for (i = 0; i < 10; i++) {
                $scope.pages.push({ numberPage: i + 1, offset: 20 * i });
            }
        });
    };
    $scope.pagination = function (varOffset, varCurrentPage) {
        $http.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=03a6fcc8f06eb2cb4609b965e64597f2&hash=fe362023656348446b7e0a931b6506a2', { params: { offset: varOffset } }).then(function (data) {
            $scope.currentPage = varCurrentPage;
            $scope.personagens = data.data.data;
            if (varCurrentPage == 0) {
                $scope.buttonPrev = 'page-item disabled';
            }
            else {
                $scope.buttonPrev = 'page-item';
            }
            if (varCurrentPage == $scope.totalPage) {
                $scope.buttonNext = 'page-item disabled';
            }
            else {
                $scope.buttonNext = 'page-item';
            }
            if (varCurrentPage > 3) {
                $scope.pages = [];
                for (i = (varCurrentPage - 4); i < (varCurrentPage + 6); i++) {
                    if (i < $scope.totalPage) {
                        $scope.pages.push({ numberPage: i + 1, offset: 20 * i });
                    }
                }
            }
            else {
                $scope.pages = [];
                for (i = 0; i < 10; i++) {
                    $scope.pages.push({ numberPage: i + 1, offset: 20 * i });
                }
            }
        });
    };
    $scope.loadingPersonagem();
}]);