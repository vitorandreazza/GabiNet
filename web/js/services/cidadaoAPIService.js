angular.module("gabiNet").factory("cidadaoAPI", function ($http, config) {
    var _getCidadaos = function () {
        return $http.get(config.baseUrl + "/cidadaos");
    };

    var _getCidadao = function (id) {
        return $http.get(config.baseUrl + "/cidadaos/" + id);
    };

    var _novoCidadao = function (cidadao) {
        return $http.post(config.baseUrl + "/cidadaos", cidadao);
    };
    
    var _setCidadao = function (cidadao) {
        return $http.put(config.baseUrl + "/cidadaos/" + cidadao.cpf, cidadao);
    };
    
    var _deleteCidadao = function (id) {
        return $http.delete(config.baseUrl + "/cidadaos/" + id);
    };

    return {
        getCidadaos: _getCidadaos,
        getCidadao: _getCidadao,
        novoCidadao: _novoCidadao,
        setCidadao: _setCidadao,
        deleteCidadao: _deleteCidadao
    };
});