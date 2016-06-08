angular.module("gabiNet").factory("atendimentoAPI", function ($http, config) {
    var _getAtendimentos = function (id, idPai) {
        return $http.get(config.baseUrl + "/atendimentos", {params:{"id": id, "idPai" : idPai}});
    };

    var _getAtendimento = function (id, idUsuario, idPai) {
        return $http.get(config.baseUrl + "/atendimentos/" + id, {params:{ "idUsuario" : idUsuario, "idPai":idPai}});
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