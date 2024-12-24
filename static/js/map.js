var draw;

var map = new ol.Map({
    
    target: 'map',
    layers: [new ol.layer.Tile({
      source: new ol.source.OSM({ crossOrigin: null }),
      visible: true,
      title: 'osm_map',
      opacity: 0.6,
      }),
    
    ],
    
    view: new ol.View({
      center: [53.3,32.31],
      zoom: 4,
      projection: 'EPSG:4326'
    })
  });


var mousePositionControl = new ol.control.MousePosition({
  className: 'custom-mouse-position',
  target: document.getElementById('location'),
  coordinateFormat: ol.coordinate.createStringXY(5),
  undefinedHTML: '&nbsp;',
  projection: 'EPSG:4326'
  //projection: proj1
});
map.addControl(mousePositionControl);


// add vectore layer
var v_source = new ol.source.Vector({});
var style1 = new ol.style.Style({
  fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.1)'
  }),
  stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 3
  }),

  image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
          color: '#ffcc33'
      })
  })
});
vector_layer = new ol.layer.Vector({
  source: v_source,
  title: 'vlayer',
  style: style1
});
map.addLayer(vector_layer);

function draw_control(element){

cc='.'+element
var buttons=document.querySelectorAll('.toolb');
buttons.forEach(function(button){
  button.classList.remove('active');
})
clicked=document.querySelector(cc);
clicked.classList.add('active')

  map.removeInteraction(draw);
  draw = new ol.interaction.Draw({
    source: vector_layer.getSource(),
    type: element
  });

  map.addInteraction(draw);
  draw.on('drawend', function (e) {
$("#attable").modal();
  clicked.classList.remove('active')
     
   

  var myFeature = e.feature;
  
  if (myFeature) {

    var geometry = myFeature.getGeometry();
    
    var   format= new ol.format.GeoJSON()
    geojson1 = format.writeGeometry(geometry);
     //console.log(geojson1);
   dd=document.getElementById("owner").value
   console.log(dd)
    add_vector_to_db(geojson1);
   map.removeInteraction(draw);
}
})
}

//popup  identify
container = document.getElementById('popup');
content = document.getElementById('popup-content');
closer = document.getElementById('popup-closer');

overlay = new ol.Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
})
map.addOverlay(overlay)
function identify(){


	map.on('singleclick', function (e) {
   const coordinate = e.coordinate;
  // const hdms =ol.coordinate.toStringHDMS((coordinate));

  // content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
	 overlay.setPosition(coordinate);
	// //  console.log(overlay.getPosition());
   overlay.setVisible('false');  
	// });
	
  // closer.onclick = function () {
  // overlay.setPosition(undefined);
  // closer.blur();
  // return false;
  // }


  
  // map.on('singleclick', function (e) {
       
  //   //var [x, y] = map.getCoordinateFromPixel(e.pixel)
  //   //var [x, y] = e.pixel;
  //   //var [w, h] = map.getSize();
  //   //console.log(selected_layers_source);
   ssss=source 
   
  //  var ssss = new ol.source.TileWMS({
  //      url: 'http://127.0.0.1:8080/geoserver/webgis/wms',
  //      params: { 'LAYERS': "webgis:states", 'TILED': true },
  //       serverType: 'geoserver',

  //   });
  //   console.log(ssss);
    var viewResolution= map.getView().getResolution()
    var url33 =ssss.getFeatureInfoUrl(
        e.coordinate, viewResolution, 'EPSG:4326',
        {
            'FEATURE_COUNT':100,
            'INFO_FORMAT': 'text/html',  //format to ask info in
            'QUERY_LAYERS': 'webgis:cities'
        } //layers to ask info for
    );
    console.log(url33)

  //   //console.log(map.getView().getResolution());
  //   if (selected_layers.length > 0) {
        $.ajax({
            data: { u: url33 }
          /*  data: { width: w, height: h, x: x, y: y, layers: selected_layers.join(','),u:url33 }*/,
            type: 'GET',
            contentType: "application/json",
            url: identify_url,
            success: function (data) {
                if (data.response == "") {
                  content.innerHTML='<p>You clicked here:</p>'
                 
                }
                else {
                 
                  content.innerHTML='<p>You clicked hekkkre:</p><code>' + data.response + '</code>'
                }
            },
            fail: function (data) {

            }
        });
  //   }

  //   });
})
}





//  map.on('singleclick', function (evt) {
//   console.log(evt.coordinate)
//   console.log(map.getView())
//  })

function zoom_ex(){
//  var zoom_ex = new ol.control.ZoomToExtent({
//   extent: [
//      42,41,
//       62,25
//   ]
// });
// map.addControl(zoom_ex)
map.getView().setCenter([53.3,32.31]);
map.getView().setZoom(4);
}

function deserialize(geojson, id) {
  jj=geojson
 // console.log(jj)
  format = new ol.format.GeoJSON();
 var features = format.readFeatures(geojson);
  geom = format.readGeometry(geojson);

  if (features) {
      var featurething = new ol.Feature({
          title: "vlayer",
          geometry: geom,
          });
      
      vector_layer.getSource().addFeature(featurething);
      featurething.set('Id', id);
  }
 }

 //edit feature
 function modif() {
clicked=document.querySelector('.edit');
clicked.classList.add('active')
  var style_s = new ol.style.Style({
      fill: new ol.style.Fill({
          color: '#eeeeee'
      }),
      stroke: new ol.style.Stroke({
          color: 'green',
          width: 2,
          opacity: 1
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: '#112233'
        })
    })
  });

  var selectInteraction = new ol.interaction.Select({
      layer: vector_layer,
      feature: geom,
      style: [style_s]
  });
  map.addInteraction(selectInteraction);

  var modif = new ol.interaction.Modify({
      features: selectInteraction.getFeatures(),
  });

  map.addInteraction(modif);
  modif.on('modifyend', function (e) {
    
    clicked.classList.remove('active')
    var features = e.features.getArray();
    //console.log(features.length);
    for (var i = 0; i < features.length; i++) {
        var f_id = features[i].get('Id');
       

        var geometry = features[i].getGeometry();
        var format = new ol.format.GeoJSON()
        var  geojson22 = format.writeGeometry(geometry);
        //console.log(geometry);
        modif_selected(f_id, geojson22);
       
    }
    map.removeInteraction(selectInteraction);
    map.removeInteraction(modif);

});
}


function delete1() {
  clicked=document.querySelector('.del');
  clicked.classList.add('active')
  var style_ss = new ol.style.Style({
      fill: new ol.style.Fill({
          color: 'red'
      }),
      stroke: new ol.style.Stroke({
          color: 'red',
          width: 2,
          opacity: 1
      })
  });

  var selectInteraction = new ol.interaction.Select({
      layer: vector_layer,
      feature:geom,
      style: [style_ss]
  });
 
  map.addInteraction(selectInteraction);
  selectInteraction.on('select', function (evt) {
      var featu = evt.selected[0];
      var f_id = featu.get('Id');
      console.log(f_id);
      if (confirm("عارضه حذف شود؟")) {
          vector_layer.getSource().removeFeature(featu);
          clicked.classList.remove('active')
          delete_selected(f_id);
          map.removeInteraction(selectInteraction);
      }

  })
}
// var slider = new ol.control.ZoomSlider(
//   {className:'zoom_slider111',
//   target:document.getElementById('location'),}
// );
// map.addControl(slider);


////layerswitcher*******
// layerSwitcher = new ol.control.LayerSwitcher({
//   activationMode: 'click',
//   startActive: true,
//   tipLabel: 'Layers', // Optional label for button
//   groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
//   collapseTipLabel: 'Collapse layers',
// });
// map.addControl(layerSwitcher);


function create_legend() {
    
  var not_valid_layer = ["osm_map", "bin","vlayer"];

  $('#legend_layers').on('changed.jstree', function (e, data) {
 ///////vhjfjkffffffffffffffffffffffff

 var lyrlist = map.getLayers();
      
 var i, j, r = [];

lyrlist.forEach(function (element) {
  
 element.setVisible(false);
});

selected_layers_source = [];
selected_layers = [];
for (i = 0, j = data.selected.length; i < j; i++) {
layer_id = data.instance.get_node(data.selected[i]).id;
is_child = data.instance.get_node(data.selected[i]).children.length == 0;
//console.log(layer_id);

if (is_child) {

 if ($.inArray(layer_id, not_valid_layer) == -1) {

     ////////selected_layers.push(layer_id.split('$')[1]);
    
     lyrlist.forEach(function (lyr) {
         

         if (lyr.get('title') === layer_id.split('$')[0]) {
             var is_visible = lyr.get('visible');
             lyr.setVisible(!is_visible);
             selected_layers.push(layer_id.split('$')[0]);
            // console.log(selected_layers)
             selected_layers_source.push(lyr.getSource());
         }
     });
     
 }
 else {
    
     lyrlist.forEach(function (lyr) {
         //console.log(lyr.get('title'));

         if (lyr.get('title') === layer_id) {
             var is_visible = lyr.get('visible');
             lyr.setVisible(!is_visible);
         }
     });
 };
           
};


};
 


  }).jstree({
    'checkbox': {
        "keep_selected_style": false
    },
    'plugins': [ "checkbox"],
    'core': {
        'data': [
            {
                'text': 'GeoServer Layers',
                'state': {
                    'opened': true,
                    'selected': true
                },
                'children': layer_json
            },
            
            {
                'text': 'OpenStreetMap',
                'state': {
                    'opened': true,
                    'selected': true
                },
                'children': [
                    { 'id': 'osm_map', 'text': 'OpenStreetMap' },
                ]
            },
            {
                'text': 'ترسیمات ',
                'state': {
                    'opened': true,
                    'selected': true
                },
                'children': [
                    { 'id': 'vlayer', 'text': 'ترسیمات کاربر' },
                ]
            }
        ]
    }
})
}