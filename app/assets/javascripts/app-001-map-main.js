var app = angular.module('TelauApp', ['ngMaterial', 'ngMessages']);
app.controller('DotsController', function($scope) {
    app.mapUpdater($scope);
    app.mapsHelper($scope);
    $scope.init = function(dots, map_center, zoom) {
        dotsObj = {};
        dots.forEach(function(dot) {
            dotsObj[dot.id] = {"coords": dot.coords};
        });
        $scope.dotsInit(dotsObj);
        $scope.mapInit(map_center, zoom);
    }
});

app.mapsHelper = function($scope){

    let map;
    let collection;

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
    	for (key in $scope.jsonMap) {

    		var placemark = new ymaps.Placemark($scope.jsonMap[key]["coords"], {
                //balloonContent: 'текст по нажатию на точку',
                //iconCaption: 'текст точки'
            }, {
                //preset: 'islands#blueCircleDotIconWithCaption',
                //iconCaptionMaxWidth: '50',
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    '<div class="placemark"></div>'
                )
            })
        	collection.add(placemark)
        }
        map.geoObjects.add(collection);
    }
}