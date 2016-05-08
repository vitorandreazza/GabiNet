var app = angular.module("gabiNet");

app.controller("principalCtrl", function ($scope, cidadaos, atendimentos, atividades) {
    $scope.atendimentos = atendimentos.data;
    $scope.cidadaos = cidadaos.data;
    $scope.atividades = atividades.data;
    
    $scope.labels = ['Projeto de Lei', 'Moções', 'Indicações', 'Requerimento', 'Oficios'];
    $scope.series = ['Aprovado', 'Reprovado'];

    $scope.data = [
        [5, 9, 8, 8, 10],
        [2, 3, 4, 4, 2]
    ];
});


