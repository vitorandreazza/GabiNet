angular.module("gabiNet").config(function ($routeProvider){
    $routeProvider.when("/cidadaos", {
        templateUrl: 'partials/listar_cidadao.html',
        controller: 'cidadaosCtrl',
        resolve: {
            cidadaos: function (cidadaoAPI) {
		return cidadaoAPI.getCidadaos();
            }
	}
    });
    $routeProvider.when("/cidadaos/novo", {
        templateUrl: 'partials/novo_cidadao.html',
        controller: 'novoCidadaoCtrl'
    });
    $routeProvider.when("/cidadaos/alterar/:id", {
        templateUrl: 'partials/alterar_cidadao.html',
        controller: 'cidadaoCtrl',
        resolve: {
            cidadao: function (cidadaoAPI, $route) {
                var cpf = $route.current.params.id;
                cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
                return cidadaoAPI.getCidadao(cpf);
            }
        }
    });
    $routeProvider.when("/cidadaos/:id", {
        templateUrl: 'partials/consultar_cidadao.html',
        controller: 'cidadaoCtrl',
        resolve: {
            cidadao: function (cidadaoAPI, $route) {
                var cpf = $route.current.params.id;
                cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
                return cidadaoAPI.getCidadao(cpf);
            }
        }
    });
    $routeProvider.when("/atendimentos", {
        templateUrl: 'partials/listar_atendimentos.html',
        controller: 'atendimentosCtrl',
        resolve: {
            atendimentos: function (atendimentoAPI) {
		return atendimentoAPI.getAtendimentos();
            }
	}
    });
    $routeProvider.when("/atendimentos/novo", {
        templateUrl: 'partials/novo_atendimento.html',
        controller: 'novoAtendimentoCtrl'
    });
    $routeProvider.when("/atendimentos/alterar/:id", {
        templateUrl: 'partials/alterar_atendimento.html',
        controller: 'atendimentoCtrl',
        resolve: {
            atendimento: function (atendimentoAPI, $route) {
                return atendimentoAPI.getAtendimento($route.current.params.id);
            }
        }
    });
    $routeProvider.when("/atendimentos/:id", {
        templateUrl: 'partials/consultar_atendimento.html',
        controller: 'atendimentoCtrl',
        resolve: {
            atendimento: function (atendimentoAPI, $route) {
                return atendimentoAPI.getAtendimento($route.current.params.id);
            }
        }
    });
    $routeProvider.when("/atividades", {
        templateUrl: 'partials/listar_atividades.html',
        controller: 'atividadesCtrl',
        resolve: {
            atividades: function (atividadeAPI) {
		return atividadeAPI.getAtividades();
            }
	}
    });
    $routeProvider.when("/atividades/novo", {
        templateUrl: 'partials/nova_atividade.html',
        controller: 'novaAtividadeCtrl'
    });
    $routeProvider.when("/atividades/grafico", {
        templateUrl: 'partials/graficos.html',
        controller: 'graficosCtrl',
        resolve: {
            grafico: function (atividadeAPI) {
                return atividadeAPI.getGrafico();
            }
        }
    });
    $routeProvider.when("/atividades/alterar/:id", {
        templateUrl: 'partials/alterar_atividade.html',
        controller: 'atividadeCtrl',
        resolve: {
            atividade: function (atividadeAPI, $route) {
                return atividadeAPI.getAtividade($route.current.params.id);
            }
        }
    });
    $routeProvider.when("/atividades/:id", {
        templateUrl: 'partials/consultar_atividade.html',
        controller: 'atividadeCtrl',
        resolve: {
            atividade: function (atividadeAPI, $route) {
                return atividadeAPI.getAtividade($route.current.params.id);
            }
        }
    });
    $routeProvider.when("/index", {
        templateUrl: 'partials/principal.html',
        controller: 'principalCtrl',
        resolve: {
                atividades: function (atividadeAPI, $route) {return atividadeAPI.getAtividades();},
                atendimentos: function (atendimentoAPI) {return atendimentoAPI.getAtendimentos();},
                cidadaos: function (cidadaoAPI) {return cidadaoAPI.getCidadaos();}
            }
    });
    //$routeProvider.otherwise({redirectTo: "index"});
});