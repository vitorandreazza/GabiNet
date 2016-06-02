angular.module("gabiNet").factory("cidadaoAPI", function ($http, config) {
    var _getCidadaos = function (idUsuario) {
        return $http.get(config.baseUrl + "/cidadaos", {params:{"idUsuario": idUsuario}});
    };

    var _getCidadao = function (id, idUsuario) {
        return $http.get(config.baseUrl + "/cidadaos/" + id, {params:{"idUsuario": idUsuario}});
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