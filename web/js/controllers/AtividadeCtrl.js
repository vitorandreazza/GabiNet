var app = angular.module("gabiNet");

app.controller("atividadesCtrl", function ($scope, atividadeAPI, atividades, $route) {
    $scope.atividades = atividades.data;

    $scope.excluiAtividade = function (id) {
        if (confirm("Confirma a exclusão da Atividade?")) {
            atividadeAPI.deleteAtividade(id)
            .success(function () {
                $route.reload();
            });  
        }
    };
});

app.controller("novaAtividadeCtrl", function ($scope, atividadeAPI, $location) {
    $scope.novaAtividade = function (atividade) {
        atividadeAPI.novaAtividade(atividade)
                .success(function () {
                    delete $scope.atividade;
                    $scope.AtividadeForm.$setPristine();
                    $location.path("/atividades");
                });
    };
});

app.controller("atividadeCtrl", function ($scope, atividade, atividadeAPI, $location) {
    $scope.atividade = atividade.data;
         
    $scope.alterarAtividade = function (atividade) {
        atividadeAPI.setAtividade(atividade)
                .success(function () {
                    $location.path("/atividades");
                });
    };
});