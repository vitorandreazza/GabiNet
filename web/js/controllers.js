var app = angular.module("gabiNet");

app.controller("cidadaoController", function ($scope) {
    $scope.cid = {
        cpf: '444.444.444-44',
        nasc: '01/04/1995',
        endereco: 'rua jao jao jao',
        complemento: 'nao sei oq é isso',
        bairro: 'Jao ja',
        cep: '13300-000',
        email: 'jao@jao.jao.br',
        tel: '(11)4002-8922',
        cel: '(99)99999-9999'
    };

    $scope.buscarCidadao = function (cidadao) {
        $scope.cidadao = cidadao;
    };
});

app.controller("graficosController", function ($scope) {
    $scope.labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    $scope.series = ['Aprovado', 'Reprovado'];

    $scope.data = [
        [5, 9, 8, 8, 10, 4, 5, 8, 7, 5, 9, 4],
        [2, 3, 4, 4, 2, 1, 5, 6, 6, 4, 2, 6]
    ];
});
