angular.module("gabiNet").factory("atividadeAPI", function ($http, config) {
    var _getAtividades = function () {
        return $http.get(config.baseUrl + "/atividades");
    };

    var _getAtividade = function (id) {
        return $http.get(config.baseUrl + "/atividades/" + id);
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

    return {
        getAtividades: _getAtividades,
        getAtividade: _getAtividade,
        novaAtividade: _novaAtividade,
        setAtividade: _setAtividade,
        deleteAtividade: _deleteAtividade
    };
});