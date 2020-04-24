angular.module("listaPersonagem").service("paginationService", [function () {
    this.startPage = function (varCurrentPage) {
        if (varCurrentPage > 5) {
            var number = varCurrentPage - 5;
            return number;
        }
        else {
            return 0;
        }
    };
    this.limitPage = function (varCurrentPage) {
        if (varCurrentPage > 5) {
            return 5;
        }
        else {
            var number = 10 - varCurrentPage;
            return number;
        }
    };
    this.classButtonPrevPage = function (varCurrentPage) {
        if (varCurrentPage == 0) {
            return 'page-item disabled';
        }
        else {
            return 'page-item';
        }
    };
    this.classButtonNextPage = function (varCurrentPage, varTotalPage) {
        if (varCurrentPage == varTotalPage - 1) {
            return 'page-item disabled';
        }
        else {
            return 'page-item';
        }
    };
}]);