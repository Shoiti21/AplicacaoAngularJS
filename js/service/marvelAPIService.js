angular.module("listaPersonagem").service("marvelAPI", ['$http', 'config', function ($http, config) {
    this.getPersonagem = function (paramsSearch) {
        return $http.get(config.baseURL + '/characters' + config.key, { params: paramsSearch });
    }
}]);