var app = angular.module("gabiNet");

app.controller("cidadaosCtrl", function ($scope, cidadaoAPI, cidadaos, $route) {
    $scope.cidadaos = cidadaos.data;

    $scope.excluiCidadao = function (cpf) {
        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
        if (confirm("Confirma a exclusão do cidadão?")) {
            cidadaoAPI.deleteCidadao(cpf)
            .success(function () {
                $route.reload();
            })
            .error(function () {
                alert("Vinculado com algum Atendimento!");
            });
        }
    };
});

app.controller("novoCidadaoCtrl", function ($scope, cidadaoAPI, $location) {
    $scope.novoCidadao = function (cidadao) {
        replaceCidadao(cidadao);
        cidadaoAPI.novoCidadao(cidadao)
                .success(function () {
                    delete $scope.cidadao;
                    $scope.cidadaoForm.$setPristine();
                    $location.path("/atendimentos/novo");
                });
    };
});

app.controller("cidadaoCtrl", function ($scope, cidadao, cidadaoAPI, $location) {
    $scope.cidadao = cidadao.data;
         
    $scope.alterarCidadao = function (cidadao) {
        replaceCidadao(cidadao);
        cidadaoAPI.setCidadao(cidadao)
                .success(function () {
                    $location.path("/cidadaos");
                });
    };
});

replaceCidadao = function (cidadao) {
        cidadao.cpf = cidadao.cpf.replace(".", "").replace(".", "").replace("-", "");

        if (cidadao.cep !== undefined) 
            cidadao.cep = cidadao.cep.replace("-", "");
        
        if (cidadao.telefone !== undefined) 
            cidadao.telefone = cidadao.telefone.replace("(", "").replace(")", "").replace("-", "");
        
        if (cidadao.celular !== undefined) 
            cidadao.celular = cidadao.celular.replace("(", "").replace(")", "").replace("-", "");
        
        if (cidadao.nascimento !== undefined && null) 
            cidadao.nascimento = new Date(cidadao.nascimento.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
};