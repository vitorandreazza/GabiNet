angular.module("gabiNet").config(function ($routeProvider) {
    $routeProvider
            .when("/cidadaos", {
                templateUrl: 'partials/listar_cidadao.html',
                controller: 'cidadaosCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    cidadaos: function (cidadaoAPI) {
                        return cidadaoAPI.getCidadaos();
                    }
                }
            })
            .when("/cidadaos/novo", {
                templateUrl: 'partials/novo_cidadao.html',
                controller: 'novoCidadaoCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                }
            })
            .when("/cidadaos/alterar/:id", {
                templateUrl: 'partials/alterar_cidadao.html',
                controller: 'cidadaoCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    cidadao: function (cidadaoAPI, $route) {
                        var cpf = $route.current.params.id;
                        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
                        return cidadaoAPI.getCidadao(cpf);
                    }
                }
            })
            .when("/cidadaos/:id", {
                templateUrl: 'partials/consultar_cidadao.html',
                controller: 'cidadaoCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    cidadao: function (cidadaoAPI, $route) {
                        var cpf = $route.current.params.id;
                        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
                        return cidadaoAPI.getCidadao(cpf);
                    }
                }
            })
            .when("/atendimentos", {
                templateUrl: 'partials/listar_atendimentos.html',
                controller: 'atendimentosCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atendimentos: function (atendimentoAPI) {
                        return atendimentoAPI.getAtendimentos();
                    }
                }
            })
            .when("/atendimentos/novo", {
                templateUrl: 'partials/novo_atendimento.html',
                controller: 'novoAtendimentoCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                }
            })
            .when("/atendimentos/alterar/:id", {
                templateUrl: 'partials/alterar_atendimento.html',
                controller: 'atendimentoCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atendimento: function (atendimentoAPI, $route) {
                        return atendimentoAPI.getAtendimento($route.current.params.id);
                    }
                }
            })
            .when("/atendimentos/:id", {
                templateUrl: 'partials/consultar_atendimento.html',
                controller: 'atendimentoCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atendimento: function (atendimentoAPI, $route) {
                        return atendimentoAPI.getAtendimento($route.current.params.id);
                    }
                }
            })
            .when("/atividades", {
                templateUrl: 'partials/listar_atividades.html',
                controller: 'atividadesCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atividades: function (atividadeAPI) {
                        return atividadeAPI.getAtividades();
                    }
                }
            })
            .when("/atividades/novo", {
                templateUrl: 'partials/nova_atividade.html',
                controller: 'novaAtividadeCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                }
            })
            .when("/atividades/grafico", {
                templateUrl: 'partials/graficos.html',
                controller: 'graficosCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                }
            })
            .when("/atividades/alterar/:id", {
                templateUrl: 'partials/alterar_atividade.html',
                controller: 'atividadeCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atividade: function (atividadeAPI, $route) {
                        return atividadeAPI.getAtividade($route.current.params.id);
                    }
                }
            })
            .when("/atividades/:id", {
                templateUrl: 'partials/consultar_atividade.html',
                controller: 'atividadeCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atividade: function (atividadeAPI, $route) {
                        return atividadeAPI.getAtividade($route.current.params.id);
                    }
                }
            })
            .when("/index", {
                templateUrl: 'partials/principal.html',
                controller: 'principalCtrl',
                auth: function (usuarioLogado) {
                    return usuarioLogado;
                },
                resolve: {
                    atividades: function (atividadeAPI) {
                        return atividadeAPI.getAtividades();
                    },
                    atendimentos: function (atendimentoAPI) {
                        return atendimentoAPI.getAtendimentos();
                    }
                }
            })
            .when("/login", {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .otherwise({redirectTo: "index"});

})
        .run(function ($rootScope, $location, $cookies) {
            $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
                if (next.$$route) { 
                    var user = $cookies.get('usuarioLogado');
                    var auth = next.$$route.auth;
                    if (auth && !auth(user)) {
                        $location.path("/login"); 
                    }
                }
            });
        });