angular.module("gabiNet").factory("atividadeAPI", function ($http, config) {
    var _getAtividades = function (idUsuario, idPai) {
        return $http.get(config.baseUrl + "/atividades",{params:{"idUsuario": idUsuario, "idPai":idPai}} );
    };

    var _getAtividade = function (id, idUsuario, idPai) {
        return $http.get(config.baseUrl + "/atividades/" + id, {params:{"idUsuario" : idUsuario, "idPai":idPai}});
    };

    var _novaAtividade = function (atividade) {
        return $http.post(config.baseUrl + "/atividades", atividade);
    };
    
    var _setAtividade = function (atividade) {
        return $http.put(config.baseUrl + "/atividades/" + atividade.id, atividade);
    };
    
    var _deleteAtividade = function (id) {
        return $http.delete(config.baseUrl + "/atividades/" + id);
    };
    
    var _getGrafico = function (datas, idUsuario, idPai) {
        return $http.get(config.baseUrl + "/atividades/grafico",{params:{"de": datas.de, "ate": datas.ate, "idUsuario": idUsuario, "idPai": idPai}});
    };

    return {
        getAtividades: _getAtividades,
        getAtividade: _getAtividade,
        novaAtividade: _novaAtividade,
        setAtividade: _setAtividade,
        deleteAtividade: _deleteAtividade,
        getGrafico: _getGrafico
    };
});