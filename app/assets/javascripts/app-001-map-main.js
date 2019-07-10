var app = angular.module('TelauApp', ['ngMaterial', 'ngMessages']);
app.controller('DotsController', function($scope) {
    app.mapUpdater($scope);
    app.mapsHelper($scope);
    app.aniRouting($scope);
    $scope.init = function(dots, map_center, zoom) {
        dotsObj = {};
        dots.forEach(function(dot) {
            dotsObj[dot.id] = {"coords": dot.coords, "walonId": dot.walonId};
        });
        $scope.dotsInit(dotsObj);
        $scope.mapInit(map_center, zoom);
    }
});

app.mapsHelper = function($scope){

    let map;
    let collection;
    var truck = {};

    $scope.mapInit = function(map_center, map_zoom) {
        ymaps.ready(()=> {init(map_center, map_zoom)});
    }

    function init(center, zoom){ 
        // Создание карты.    
        map = new ymaps.Map("map", {
            center: center,
            zoom: zoom
        });
        collection = new ymaps.GeoObjectCollection();
        $scope.rebuildMap();
    }

    $scope.rebuildMap = function() {
        collection.removeAll();
    	/*for (key in $scope.jsonMap) {

    		var placemark = new ymaps.Placemark($scope.jsonMap[key]["coords"], {
                balloonContent: 'текст по нажатию на точку',
                iconCaption: 'текст точки'
            }, {
                //preset: 'islands#blueCircleDotIconWithCaption',
                //iconCaptionMaxWidth: '50',
                //iconLayout: ymaps.templateLayoutFactory.createClass(
                //    '<div class="placemark"></div>'
                //)
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    '<div class="truck-direction truck-direction-$[properties.direction]"><i class="fas fa-truck"></i></div>'
                )
            })
        	collection.add(placemark)
        }
        map.geoObjects.add(collection);*/
        for (key in $scope.jsonMap) {
            truck[key] = truck[key] || new $scope.Truck($scope.jsonMap[key]["coords"], {
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    //'<div class="b-truck b-truck_blue b-truck-direction-$[properties.direction]"></div>'
                    //'<div class="circle"></div>'
                    '<div class="truck-direction truck-direction-$[properties.direction]"><i class="fas fa-truck"></i></div>'
                )
            });
            map.geoObjects.add(truck[key]);
            //console.log($scope.jsonMap[key])
        }
    }

    $scope.startRoute = function(startPoint, endPoint, id) {
        if (startPoint[0] == endPoint[0] && startPoint[1] == endPoint[1]) {
            return;
        }
        dist = Math.sqrt(Math.pow(startPoint[0] - endPoint[0], 2) + Math.pow(startPoint[1] - endPoint[1], 2));
        // console.log(startPoint[0] - endPoint[0]);
        // console.log(startPoint[1] - endPoint[1]);
        // console.log(dist);
        truck[id] = truck[id] || new $scope.Truck({
            iconLayout: ymaps.templateLayoutFactory.createClass(
                //'<div class="b-truck b-truck_blue b-truck-direction-$[properties.direction]"></div>'
                //'<div class="circle"></div>'
                '<div class="truck-direction truck-direction-$[properties.direction]"><i class="fas fa-truck"></i></div>'
            )
        });
        ymaps.route([
            startPoint,
            endPoint
        ], {
            // Опции маршрутизатора
            mapStateAutoApply: false // автоматически позиционировать карту
        }).then(function (route) {
            // Прозрачный маршрут
            route.getPaths().options.set('strokeColor', '00000000');
            // Задание контента меток в начальной и конечной точках
            var points = route.getWayPoints();
            points.get(0).properties.set("iconContent", "А");
            points.get(1).properties.set("iconContent", "Б");
            // Добавление маршрута на карту
            map.geoObjects.add(route.getPaths());
            // И "машинку" туда же
            map.geoObjects.add(truck[id]);
            // Отправляем машинку по полученному маршруту простым способом
            // truck.moveTo(route.getPaths().get(0).getSegments());
            // или чуть усложненным: с указанием скорости,
            truck[id].moveTo(route.getPaths().get(0).getSegments(), {
                // Надо реалистично посчитать скорость
                speed: dist * 5000,
                directions: 8
            }, function (geoObject, coords, direction) { // тик движения
                // перемещаем машинку
                geoObject.geometry.setCoordinates(coords);
                // ставим машинке правильное направление - в данном случае меняем ей текст
                geoObject.properties.set('direction', direction.t);
            }, function (geoObject) { // приехали
                map.geoObjects.remove(route);
                //map.geoObjects.remove(truck);
            });
        }, function (error) {
            console.error("Возникла ошибка: " + error.message);
        });
    }

}