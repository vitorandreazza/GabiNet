var app = angular.module("gabiNet");

app.controller("cidadaosCtrl", function ($scope, cidadaoAPI, cidadaos, $route, $location, cidadaoSelecionado) {
    $scope.cidadaos = cidadaos.data;
    
    $scope.combo = {
        //opcoes para o select| procura e a chave e o valor que sera procurado no filtro
        opcoes: [
            {name: 'Tudo', procura: {$: ''}},
            {name: 'Nome', procura: {nome: ''}},
            {name: 'Cpf', procura: {cpf: ''}}
        ],
        //opção default do select e option selecionado do select
        opcaoSelecionada: {name: 'Nome', procura: {id: ''}}
    };

    $scope.selecionaKey = function () {
        $scope.combo.opcaoSelecionada.procura[Object.keys($scope.combo.opcaoSelecionada.procura)[0]] = $scope.textoBusca;
    };
    
    $scope.mudou = function () {
        console.log($scope.combo.opcaoSelecionada.name);
        if ($scope.combo.opcaoSelecionada.name === "Cpf") {
            //adiciona mascara quando a procura e por data
            $scope.html = '<input type="text" mask="999.999.999-99" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
            $scope.textoBusca = "";
        } else {
            //tira a mascara
            $scope.html = '<input type="text" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
        }
    };
    
    $scope.excluiCidadao = function (id) {
        if (confirm("Confirma a exclusão do cidadão?")) {
            cidadaoAPI.deleteCidadao(id)
            .success(function () {
                $route.reload();
            })
            .error(function () {
                alert("Vinculado com algum Atendimento!");
            });
        }
    };
    
    $scope.redirecionaCidadao = function (cidadao) {
        cidadaoSelecionado.id = cidadao.id;
        cidadaoSelecionado.nome = cidadao.nome;
        $location.path("/atendimentos/novo");  
    };
});

app.controller("novoCidadaoCtrl", function ($scope, cidadaoAPI, $location, $cookies) {
    $scope.novoCidadao = function (cidadao) {
        replaceCidadao(cidadao);
        if (cidadao.cpf !== undefined && cidadao.cpf !== null) {
            if(!validarCPF(cidadao.cpf)) {
                $scope.erro = true;
                return;
            }
        }
        $scope.erro = false;
        cidadao.usuario = {};
        cidadao.usuario.id = $cookies.get('idPai');
        cidadaoAPI.novoCidadao(cidadao)
            .success(function () {
                delete $scope.cidadao;
                $scope.cidadaoForm.$setPristine();
                $location.path("/cidadaos");
            });
    };
});

app.controller("cidadaoCtrl", function ($scope, cidadao, cidadaoAPI, $location) {
    $scope.cidadao = cidadao.data;
    var data = new Date($scope.cidadao.nascimento);
    $scope.cidadao.nascimento = data.getDate()+1 + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    $scope.alterarCidadao = function (cidadao) {
        replaceCidadao(cidadao);
        cidadaoAPI.setCidadao(cidadao)
            .success(function () {
                $location.path("/cidadaos");
            });
    };
            
});

replaceCidadao = function (cidadao) {
    if (cidadao.cpf !== undefined && cidadao.cpf !== null)
        cidadao.cpf = cidadao.cpf.replace(".", "").replace(".", "").replace("-", "");

    if (cidadao.cep !== undefined && cidadao.cep !== null) 
        cidadao.cep = cidadao.cep.replace("-", "");

    if (cidadao.telefone !== undefined && cidadao.telefone !== null) 
        cidadao.telefone = cidadao.telefone.replace("(", "").replace(")", "").replace("-", "");

    if (cidadao.celular !== undefined && cidadao.celular !== null) 
        cidadao.celular = cidadao.celular.replace("(", "").replace(")", "").replace("-", "");

    if (cidadao.nascimento !== undefined && cidadao.nascimento !== null) 
        cidadao.nascimento = new Date(cidadao.nascimento.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
};

function validarCPF(cpf) {  
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf === '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length !== 11 || 
        cpf === "00000000000" || 
        cpf === "11111111111" || 
        cpf === "22222222222" || 
        cpf === "33333333333" || 
        cpf === "44444444444" || 
        cpf === "55555555555" || 
        cpf === "66666666666" || 
        cpf === "77777777777" || 
        cpf === "88888888888" || 
        cpf === "99999999999")
            return false;       
    // Valida 1o digito 
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev === 10 || rev === 11)     
            rev = 0;    
        if (rev !== parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev === 10 || rev === 11) 
        rev = 0;    
    if (rev !== parseInt(cpf.charAt(10)))
        return false;       
    return true;   
}