angular.module("gabiNet", ['ngRoute', 'ngMask', 'chart.js']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/cidadaos", {
        templateUrl: 'partials/listar_cidadao.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/cidadaos/novo", {
        templateUrl: 'partials/cadastro_cidadao.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/cidadaos/alterar/:id", {
        templateUrl: 'partials/alterar_cidadao.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/cidadaos/:id", {
        templateUrl: 'partials/consultar_cidadao.html',
        controller: 'cidadaoController'
    });
    $routeProvider.when("/atendimentos", {
        templateUrl: 'partials/listar_atendimentos.html',
        controller: 'atendimentoController'
    });
    $routeProvider.when("/atendimentos/novo", {
        templateUrl: 'partials/novo_atendimento.html',
        controller: 'atendimentoController'
    });
    $routeProvider.when("/atendimentos/:id", {
        templateUrl: 'partials/consultar_atendimento.html',
        controller: 'atendimentoController'
    });
    $routeProvider.when("/atividades/novo", {
        templateUrl: 'partials/nova_atividade.html',
        controller: 'atividadeController'
    });
    $routeProvider.when("/atividades", {
        templateUrl: 'partials/listar_atividades.html',
        controller: 'atividadeController'
    });
    $routeProvider.when("/atividades/:id", {
        templateUrl: 'partials/consultar_atividade.html',
        controller: 'atividadeController'
    });
    $routeProvider.when("/atividades/grafico", {
        templateUrl: 'partials/graficos.html',
        controller: 'graficosController'
    });
}]);
