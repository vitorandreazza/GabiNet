angular.module("gabiNet", ['ngRoute', 'ngMask', 'chart.js']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/cidadaos", {
        templateUrl: 'partials/consultar_cidadao.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/cidadaos/novo", {
        templateUrl: 'partials/cadastro_cidadao.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/atendimentos/novo", {
        templateUrl: 'partials/novo_atendimento.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/atendimentos", {
        templateUrl: 'partials/consultar_atendimento.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/atividades/novo", {
        templateUrl: 'partials/nova_atividade.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/atividades", {
        templateUrl: 'partials/consultar_atividade.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/atividades/grafico", {
        templateUrl: 'partials/graficos.html',
        controller: 'graficosController'
    });
}]);
