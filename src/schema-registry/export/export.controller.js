angularAPP.controller('ExportSchemasCtrl', function ($rootScope, $scope, env,SchemaRegistryFactory, $location, $log) {
  $scope.$on('$routeChangeSuccess', function() {
       $scope.cluster = env.getSelectedCluster().NAME;//$routeParams.cluster;
  })
  $scope.$watch(function () {
    return $rootScope.showSpinner;
  }, function (a) {
    $scope.allSchemas = SchemaRegistryFactory.getAllSchemas($rootScope.Cache)
  }, true);

  var d = new Date()
  $scope.date = '-'+d.getDate()+''+(d.getMonth()+1)+''+d.getFullYear()+''+d.getHours()+''+d.getMinutes()

  $scope.downloadLatestSchemas = function (schemas) {
    var downloadFileLatest = '';

    angular.forEach(schemas, function (schema, key) {
      downloadFileLatest += '\n echo >>>' + schema.subjectName +'.'+ schema.version + '.json << \n' + schema.schema + ' \n \n EOF';
      if (key==schemas.length - 1){
        downloadFileLatest += '\n\n # To restore the schema - edit & run the following \n # export NEW_SCHEMA_REGISTRY=http://new-schema-registry-url:port \n # for (files in *.*.json) curl -x POST $files $SCHEMA_REGISTRY'
        var curlsBlob = new Blob([ downloadFileLatest ], { type : 'text/plain' });
        $scope.curlsURL = (window.URL || window.webkitURL).createObjectURL( curlsBlob );
      }
    })
  }

  $scope.downloadAllSchemas = function (schemas) {
    var downloadFileAll = '';

    angular.forEach(schemas, function (schema, key) {
      downloadFileAll += '\n echo >>>' + schema.subject +'.'+ schema.version + '.json << \n' + schema.schema + ' \n \n EOF';
      if (key==schemas.length - 1){
        downloadFileAll += '\n\n # To restore the schema - edit & run the following \n # export NEW_SCHEMA_REGISTRY=http://new-schema-registry-url:port \n # for (files in *.*.json) curl -x POST $files $SCHEMA_REGISTRY'
        var curlsBlob = new Blob([ downloadFileAll ], { type : 'text/plain' });
        $scope.curlsURL = (window.URL || window.webkitURL).createObjectURL( curlsBlob );
      }
    })
    }

})