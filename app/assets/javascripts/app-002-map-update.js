app.mapUpdater = function($scope){

    $scope.dotsInit = function(dots) {
        $scope.jsonMap = dots;
        $scope.walonCoordsUpdater = setInterval(walonCoordsGetter, 3000);
    }

 	$scope.addPoint = function(data) {
        if (typeof data == "undefined") {
            data = document.getElementsByName("json")[0].value;
        }

        fetch('/map_points', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: data
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log("data:", data);
            $scope.jsonMap[data.walon_id] = {"coords": [data.lat, data.lon]};
        })
        .catch( alert );
    }

    //вместо точки теперь удаляется walon и все его точки
    $scope.deleteWalon = function(dot_id) {
        let link = '/walons/' + dot_id
        fetch(link, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            delete $scope.jsonMap[data.id];
        })
        .catch( alert );
    }

    //получение данных и обновление карты
    function walonCoordsGetter() {
        fetch('walons', {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (i in data) {
                $scope.jsonMap[data[i]["id"]] = {"coords": data[i]["coords"]};
            }
            //console.log($scope.jsonMap);
            $scope.rebuildMap();
            $scope.$apply();
        })
        .catch( alert );
    }

    // функция для показа demo (удалить)
    $scope.startDemo = function() {
        var a = {
            "tm": 1561367237,
            "events": [
                {
                    "i": 18960170,
                    "t": "m",
                    "d": {
                        "t": 1561367218,
                        "f": 1073741827,
                        "tp": "ud",
                        "pos": {
                            "y": 55.7800941467,
                            "x": 37.6253509521,
                            "c": 8,
                            "z": 154,
                            "s": 2,
                            "sc": 11
                        }
                    }
                }
            ]
        }
        var demoTimer = setInterval(() => {
            a["events"][0]["d"]["pos"]["x"] += 0.02;
            a["events"][0]["d"]["pos"]["y"] += 0.02;
            $scope.addPoint(JSON.stringify(a));

        }, 1000);
        setTimeout(function() {
            clearInterval(demoTimer);
            alert('демо окончено');
        }, 30000);
    }
}