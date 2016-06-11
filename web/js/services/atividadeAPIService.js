angular.module("gabiNet").factory("atividadeAPI", function ($http, config) {
    var _getAtividades = function (idPai) {
        return $http.get(config.baseUrl + "/atividades",{params:{"idPai":idPai}} );
    };

    var _getAtividade = function (id, idPai) {
        return $http.get(config.baseUrl + "/atividades/" + id, {params:{"idPai":idPai}});
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
    
    var _getGrafico = function (datas, idPai) {
        return $http.get(config.baseUrl + "/atividades/grafico",{params:{"de": datas.de, "ate": datas.ate, "idPai": idPai}});
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