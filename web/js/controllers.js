var app = angular.module("gabiNet");
var urlBase = "http://localhost:8084/gabinet/api";

app.controller("cidadaoController", function ($scope, $http) {
    $scope.inserirCidadao = function (cidadao) {
        var cpf = cidadao.cpf.replace(".", "").replace(".", "").replace("-", "");
        cidadao.cpf = cpf;

        if (cidadao.cep !== undefined) {
            var cep = cidadao.cep.replace("-", "");
            cidadao.cep = cep;
        }
        if (cidadao.telefone !== undefined) {
            var telefone = cidadao.telefone.replace("(", "").replace(")", "").replace("-", "");
            cidadao.telefone = telefone;
        }
        if (cidadao.celular !== undefined) {
            var celular = cidadao.celular.replace("(", "").replace(")", "").replace("-", "");
            cidadao.celular = celular;
        }
        if (cidadao.nascimento !== undefined) {
            cidadao.nascimento = new Date(cidadao.nascimento.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
        }
        $http.post(urlBase + "/cidadaos", cidadao)
                .success(function (data) {
                    console.info(JSON.stringify("Cidadão salvo com sucesso!: " + data));
                })
                .error(function (error) {
                    console.error(JSON.stringify("Erro ao incluir o cidadão: " + error));
                    alert(JSON.stringify("Erro ao incluir o cidadão: " + error));
                });
    };
    
    $scope.buscaCidadao = function (cpf) {
        var cpfr = cpf.replace(".", "").replace(".", "").replace("-", "");
        cpf = cpfr;
        $http.get(urlBase + "/cidadaos/" + cpf)
                .success(function (data) {
                    $scope.cidadao = data;
                    console.log($scope.cidadao);
                })
                .error(function () {
                    console.log('Erro ao obter os dados do cidadao');
                    $scope.cidadao = "ERRO ao efetuar o SELECT!";
                });
    };
    
    $scope.alterarCidadao = function (cidadao) {
        var cpfr = cidadao.cpf.replace(".", "").replace(".", "").replace("-", "");
        cidadao.cpf = cpfr;

        if (cidadao.cep !== undefined) {
            var cep = cidadao.cep.replace("-", "");
            cidadao.cep = cep;
        }
        if (cidadao.telefone !== undefined) {
            var telefone = cidadao.telefone.replace("(", "").replace(")", "").replace("-", "");
            cidadao.telefone = telefone;
        }
        if (cidadao.celular !== undefined) {
            var celular = cidadao.celular.replace("(", "").replace(")", "").replace("-", "");
            cidadao.celular = celular;
        }
        if (cidadao.nascimento !== undefined) {
            cidadao.nascimento = new Date(cidadao.nascimento.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
        }
        $http.put(urlBase + "/cidadaos/" + cidadao.cpf, cidadao)
                .success(function (data) {
                    //altera mas atribui nulo ao data criação e cai no erro
                    if (data !== 'true') {
                        console.error("Erro ao alterar o cidadao: " + data);
                    } else {
                        console.info("Cidadao " + cidadao.nome + " alterado com sucesso!");
                    }
                    ;
                });
    };
       $scope.listarCidadaos = function () {
        $http.get(urlBase + "/cidadaos")
                .success(function (data) {
                    $scope.cidadaos = data;
                })
                .error(function () {
                    console.log('Erro ao obter os dados dos cidadaos');
                });
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

app.controller("atendimentoController", function ($scope, $http) {
    $scope.combo = {
        //opcoes para o select| procura e a chave e o valor que sera procurado no filtro
        opcoes: [
            {name: 'Tudo', procura: {$: ''}},
            {name: 'Nº Atendimento', procura: {id: ''}},
            {name: 'Nome cidadão', procura: {cidadao: {nome: ''}}},
            {name: 'Solicitacão', procura: {solicitacao: ''}},
            {name: 'Data', procura: {dataAtendimento: ''}}
        ],
        //opção default do select e option selecionado do select
        opcaoSelecionada: {name: 'Nº Atendimento', procura: {id: ''}}
    };

    $scope.novoAtendimento = function (atendimento) {
        $http.post(urlBase + "/atendimentos", atendimento)
                .success(function (data) {
                    console.info(JSON.stringify("Atendimento salvo com sucesso!: " + data));
                })
                .error(function (error) {
                    console.error(JSON.stringify("Erro ao incluir o atendimento: " + error));
                    alert(JSON.stringify("Erro ao incluir o atendimento: " + error));
                });
    };
    
    $scope.listarAtendimentos = function () {
        $http.get(urlBase + "/atendimentos")
                .success(function (data) {
                    $scope.atendimentos = data;
                    console.log(data);
                })
                .error(function () {
                    console.log('Erro ao obter os dados dos atendimentos');
                    $scope.atendimentos = "ERRO ao efetuar o SELECT!";
                });
    };
    
    $scope.buscaCidadao = function (cpf) {
        var cpfr = cpf.replace(".", "").replace(".", "").replace("-", "");
        cpf = cpfr;
        $http.get(urlBase + "/cidadaos/" + cpf)
                .success(function (data) {
                    $scope.atendimento.cidadao = {};
                    $scope.atendimento.cidadao = data;
                    console.log($scope.atendimento);
                })
                .error(function () {
                    console.log('Erro ao obter os dados do cidadao');
                    //$scope.cidadao = "ERRO ao efetuar o SELECT!";
                });
    };
    
    $scope.selecionaKey = function () {
        if ($scope.combo.opcaoSelecionada.name === "Nome cidadão") {
            $scope.combo.opcaoSelecionada.procura.cidadao.nome = $scope.textoBusca;
            return;
        }
        
        if($scope.combo.opcaoSelecionada.name === "Data") {
            var splitted = $scope.textoBusca.split("/");
            var date = "";
            if (splitted.length < 2) {
                //busca apenas o dia
                date = $scope.textoBusca;
            }else if (splitted.length < 3) {
                //busca o dia com o mes
                date = splitted[1] + "-" + splitted[0];
            } else {
                //busca a data toda
                date = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
            }
            //$scope.combo.opcaoSelecionada.procura[Object.keys($scope.combo.opcaoSelecionada.procura)[0]] = date;
            $scope.combo.opcaoSelecionada.procura.dataAtendimento = date;
            return;
        }
        $scope.combo.opcaoSelecionada.procura[Object.keys($scope.combo.opcaoSelecionada.procura)[0]] = $scope.textoBusca;
    };
    
    $scope.mudou = function() {
        console.log($scope.combo.opcaoSelecionada.name);
        if ($scope.combo.opcaoSelecionada.name === "Data") {
            //adiciona mascara quando a procura e por data
            $scope.html = '<input type="text" mask="99/99/9999" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
            $scope.textoBusca = "";
        } else {
            //tira a mascara
            $scope.html = '<input type="text" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
        }
    };
});
//diretiva que adiciona uma html dinamicamente
app.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

app.controller("atividadeController", function ($scope, $http) {
    $scope.novaAtividade = function (atividade) {
        $http.post(urlBase + "/atividades", atividade)
                .success(function (data) {
                    console.info(JSON.stringify("Atividade salva com sucesso!: " + data));
                })
                .error(function (error) {
                    console.error(JSON.stringify("Erro ao incluir a atividade: " + error));
                    alert(JSON.stringify("Erro ao incluir a atividade: " + error));
                });
    };
    
    $scope.listarAtividades = function () {
        $http.get(urlBase + "/atividades")
                .success(function (data) {
                    $scope.atividades = data;
                    console.log(data);
                })
                .error(function () {
                    console.log('Erro ao obter os dados das atividades');
                });
    };
});