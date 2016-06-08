var app = angular.module("gabiNet");

app.controller("atendimentosCtrl", function ($scope, atendimentoAPI, atendimentos, $route) {
    $scope.atendimentos = atendimentos.data;

    $scope.excluiAtendimento = function (id) {
        if (confirm("Confirma a exclusão do Atendimento?")) {
            atendimentoAPI.deleteAtendimento(id)
            .success(function () {
                $route.reload();
            });  
        }
    };
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

    $scope.selecionaKey = function () {
        if ($scope.combo.opcaoSelecionada.name === "Nome cidadão") {
            $scope.combo.opcaoSelecionada.procura.cidadao.nome = $scope.textoBusca;
            return;
        }

        if ($scope.combo.opcaoSelecionada.name === "Data") {
            var splitted = $scope.textoBusca.split("/");
            var date = "";
            if (splitted.length < 2) {
                //busca apenas o dia
                date = $scope.textoBusca;
            } else if (splitted.length < 3) {
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

    $scope.mudou = function () {
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

app.controller("novoAtendimentoCtrl", function ($scope, atendimentoAPI, $location, config, $http, cidadaoSelecionado, $cookies)
{
    $scope.inicia = function () {
        $scope.atendimento = {};
        $scope.atendimento.cidadao = {};
        $scope.atendimento.cidadao = cidadaoSelecionado;
    };
    
    
    $scope.buscaCidadao = function (cpf) {
        var cpfr = cpf.replace(".", "").replace(".", "").replace("-", "");
        cpf = cpfr;
        $http.get(config.baseUrl + "/cidadaos/" + cpf)
                .success(function (data) {
                    $scope.atendimento.cidadao = {};
                    $scope.atendimento.cidadao = data;
                    console.log($scope.atendimento);
                })
                .error(function () {
                    console.log('Erro ao obter os dados do cidadao');
                });
    };
    
    $scope.novoAtendimento = function (atendimento) {
        atendimento.cidadao.cpf = atendimento.cidadao.cpf.replace(".", "").replace(".", "").replace("-", "");
        atendimento.usuario = {};
        atendimento.usuario.id = $cookies.get('id');
        atendimentoAPI.novoAtendimento(atendimento)
                .success(function () {
                    delete $scope.atendimento;
                    $scope.atendimentoForm.$setPristine();
                    $location.path("/atendimentos");
                }).error(function(data){
                    console.log(data);
                });
    };
});

app.controller("atendimentoCtrl", function ($scope, atendimento, atendimentoAPI, $location) {
    $scope.atendimento = atendimento.data;
         
    $scope.alterarAtendimento = function (atendimento) {
        atendimentoAPI.setAtendimento(atendimento)
                .success(function () {
                    $location.path("/atendimentos");
                });
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