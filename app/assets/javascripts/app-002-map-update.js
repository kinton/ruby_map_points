app.mapUpdater = function($scope){

    $scope.dotsInit = function(dots) {
        $scope.jsonMap = dots;
    }
 	$scope.addPoint = function(){
        fetch('/map_points', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            /*body: JSON.stringify({
            	walon_id: 1,
                lat: document.getElementsByName("lat")[0].value,
                lon: document.getElementsByName("lon")[0].value,
                tm: 123123123
            })*/
            body: document.getElementsByName("json")[0].value
        })
        .then(function(response) {
            //console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log("data:", data);
            $scope.jsonMap[data.id] = {"coords": [data.lat, data.lon]};
            $scope.rebuildMap();
            $scope.$apply();
        })
        .catch( alert );
    }

    $scope.deletePoint = function(dot_id) {
        let link = '/map_points/' + dot_id;
        fetch(link, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(function(response) {
            //console.log(response)
            return response.json()
        })
        .then(function(data) {
            delete $scope.jsonMap[data.id];
            $scope.rebuildMap();
            $scope.$apply();
        })
        .catch( alert );
    }
}