angular.module("gabiNet").factory("loginAPI", function ($http, config) {
    var _getUsuario = function (usuario) {
        return $http.get(config.baseUrl + "/login/" + usuario.login + "/" + usuario.senha);
    };
    
    var _getID = function (login) {
        return $http.get(config.baseUrl + "/login/" + login);
    };
    
    var _getUsuarios = function (idPai) {
        return $http.get(config.baseUrl + "/login", {params:{"idPai": idPai}});
    };
    
    var _postUsuario = function (usuario, senha) {
        return $http.post(config.baseUrl + "/login", usuario, {params:{"senha" : senha}});
    };
    
    var _deletaAssessor = function (id) {
        return $http.delete(config.baseUrl + "/login", {params:{"id" : id}});
    };
    
    var _alterarAssessor = function (usuario) {
        return $http.put(config.baseUrl + "/login/" + usuario.id, usuario);
    };
    
    var _getNome = function (idPai) {
        return $http.get(config.baseUrl + "/login/nome", {params:{"idPai" : idPai}});
    };
    
    return {
        getUsuario: _getUsuario,
        getID: _getID,
        getUsuarios: _getUsuarios,
        postUsuario: _postUsuario,
        deletaAssessor: _deletaAssessor,
        alterarAssessor: _alterarAssessor,
        getNome: _getNome
    };
});