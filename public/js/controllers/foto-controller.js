angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, $routeParams){

    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId){

        recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto){
            $scope.foto = foto;
        }, function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        });

        /*
        // buscar a foto no servidor
        $http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function(foto){
            $scope.foto = foto;
        })
        .error(function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        });
        */
    }

    $scope.submeter = function(){
        if($scope.formulario.$valid){
            if($routeParams.fotoId){
                recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto, function(){
                        $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada';
                    }, function(erro){
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
                    });
                /*
                $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                .success(function(){
                    $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada';
                })
                .error(function(erro){
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
                });
                */
            }else{
                recursoFoto.save($scope.foto, function(){
                    $scope.foto = {};
                    $scope.mensagem = 'Foto adicionada com sucesso';
                }, function(erro){
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível cadastrar a foto';
                });
                /*
                $http.post('/v1/fotos', $scope.foto)
                .success(function(){
                    $scope.foto = {};
                    $scope.mensagem = 'Foto adicionada com sucesso';
                })
                .error(function(erro){
                    $scope.mensagem = 'Não foi possível cadastrar a foto';
                });
                */
            }
        }
    };
});