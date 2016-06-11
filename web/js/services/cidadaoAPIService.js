angular.module("gabiNet").factory("cidadaoAPI", function ($http, config) {
    var _getCidadaos = function (idPai) {
        return $http.get(config.baseUrl + "/cidadaos", {params:{"idPai":idPai}});
    };

    var _getCidadao = function (id, idPai) {
        return $http.get(config.baseUrl + "/cidadaos/" + id, {params:{"idPai":idPai}});
    };

    var _novoCidadao = function (cidadao) {
        return $http.post(config.baseUrl + "/cidadaos", cidadao);
    };
    
    var _setCidadao = function (cidadao) {
        return $http.put(config.baseUrl + "/cidadaos/" + cidadao.id, cidadao);
    };
    
    var _deleteCidadao = function (id) {
        return $http.delete(config.baseUrl + "/cidadaos/" + id);
    };
    
    var _getAniversariantes = function (datas, idPai) {
        return $http.get(config.baseUrl + "/cidadaos/aniversarios", {params:{"de": datas.de, "ate": datas.ate, "idPai": idPai}});
    };

    return {
        getCidadaos: _getCidadaos,
        getCidadao: _getCidadao,
        novoCidadao: _novoCidadao,
        setCidadao: _setCidadao,
        deleteCidadao: _deleteCidadao,
        getAniversariantes: _getAniversariantes
    };
});