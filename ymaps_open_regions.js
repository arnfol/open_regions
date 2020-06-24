ymaps.ready(init);

function init() {

    var grey = '#3D4C76';
    var green = '#49C0B5';
    var yellow = '#F0E68C';

    var green_regions = [
        "Алтайский край", 
        "Амурская область", 
        "Архангельская область", 
        "Республика Башкортостан", 
        "Республика Бурятия", 
        "Владимирская область", 
        "Волгоградская область", 
        "Республика Ингушетия", 
        "Иркутская область", 
        "Кабардино-Балкарская Республика", 
        "Калининградская область", 
        "Калужская область", 
        "Кемеровская область", 
        "Краснодарский край", 
        "Курская область", 
        "Ленинградская область", 
        "Москва", 
        "Московская область", 
        "Мурманская область", 
        "Нижегородская область", 
        "Новосибирская область", 
        "Омская область", 
        "Орловская область", 
        "Пермский край", 
        "Приморский край", 
        "Санкт-Петербург", 
        "Свердловская область", 
        "Смоленская область", 
        "Тамбовская область", 
        "Республика Татарстан", 
        "Тверская область", 
        "Тульская область", 
        "Тюменская область", 
        "Удмуртская Республика", 
        "Ульяновская область", 
        "Республика Хакасия", 
        "Челябинская область", 
        "Ярославская область" 
        ];
        
    var yellow_regions = [
        "Республика Адыгея",
        "Республика Карелия",
        "Красноярский край",
        "Республика Крым",
        "Томская область",
        "Ханты-Мансийский автономный округ",
        "Ямало-Ненецкий автономный округ"
        ];
        
    var map = new ymaps.Map('map', {
        center: [58.704272, 95.602030],
        zoom: 2,
        type: 'yandex#map',
        controls: ['zoomControl']
    });
    map.controls.get('zoomControl').options.set({size: 'small'});
    // Зададим цвета для раскрашивания.
    // Обратите внимание, для раскраски более крупных карт нужно задавать пятый цвет.
    var colors = ['#F0F075', '#F0E68C', '#3D4C76', '#49C0B5'];


    var objectManager = new ymaps.ObjectManager();
    
    var colorCounter = 0;
    
    // Загрузим регионы.
    ymaps.borders.load('RU', {
        lang: 'ru',
        quality: 2
    }).then(function (result) {
        // Очередь раскраски.
        var queue = [];
        // Создадим объект regions, где ключи это ISO код региона.
        var regions = result.features.reduce(function (acc, feature) {
            // Добавим ISO код региона в качестве feature.id для objectManager.
            var iso = feature.properties.iso3166;
            feature.id = iso;
            
            // console.log(feature.properties.name)
            
            var fColor = grey;
            if (green_regions.indexOf(feature.properties.name) >= 0) {
                // console.log(feature.properties.name)
                green_regions.splice(green_regions.indexOf(feature.properties.name), 1);
                fColor = green;
            } else if (yellow_regions.indexOf(feature.properties.name) >= 0) {
                // console.log(feature.properties.name)
                yellow_regions.splice(yellow_regions.indexOf(feature.properties.name), 1);
                fColor = yellow;
            }
            
            // Добавим опции региона по умолчанию.
            feature.options = {
                fillOpacity: 0.6,
                strokeColor: '#FFF',
                fillColor: fColor,
                strokeOpacity: 0.5
            };
            acc[iso] = feature;
            return acc;
        }, {});
        
        console.log(green_regions)
        console.log(yellow_regions)

        // Добавим регионы на карту.
        result.features = [];
        for (var reg in regions) {
            result.features.push(regions[reg]);
        }
        objectManager.add(result);
        map.geoObjects.add(objectManager);
    })
}
