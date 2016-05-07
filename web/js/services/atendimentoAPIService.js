angular.module("gabiNet").factory("atendimentoAPI", function ($http, config) {
    var _getAtendimentos = function () {
        return $http.get(config.baseUrl + "/atendimentos");
    };

    var _getAtendimento = function (id) {
        return $http.get(config.baseUrl + "/atendimentos/" + id);
    };

    var _novoAtendimento = function (atendimento) {
        return $http.post(config.baseUrl + "/atendimentos", atendimento);
    };
    
    var _setAtendimento = function (atendimento) {
        return $http.put(config.baseUrl + "/atendimentos/" + atendimento.id, atendimento);
    };
    
    var _deleteAtendimento = function (id) {
        return $http.delete(config.baseUrl + "/atendimentos/" + id);
    };

    return {
        getAtendimentos: _getAtendimentos,
        getAtendimento: _getAtendimento,
        novoAtendimento: _novoAtendimento,
        setAtendimento: _setAtendimento,
        deleteAtendimento: _deleteAtendimento
    };
});