angular.module('alurapic').controller('FotosController', function($scope, $http) {

    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = '';
   
    $http.get('/v1/fotos')
    .success(function(retorno){
        console.log(retorno);
        $scope.fotos = retorno; // nao precisa fazer o retorno.data
    })
    .error(function(erro){
        console.log(erro);
    });

    $scope.remover = function(foto){

        $http.delete('/v1/fotos/' + foto._id)
        .success(function(){
            // javascript
            var indiceDaFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceDaFoto, 1)
            $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
        })
        .error(function(erro){
            $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
        });
    };




//...//
















    /*
    var promise = $http.get('/v1/fotos');
    promise.then(function(retorno){
        $scope.fotos = retorno.data;
    }).catch(function(error){
        console.log(error);
    });
    */

    /*
        $scope.foto = {
            titulo : 'Leão',
            url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
        };
    */
    });