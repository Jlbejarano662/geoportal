import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, Map, tileLayer, geoJSON, Control } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  // Instanciar el Mapa
  public map: Map | undefined;

  constructor(private http: HttpClient) {
  }

  //Mapa base 
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    /* layer: tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', */
    /* layer: tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_nolabels/{z}/{x}/{y}.png,', */
    /* layer: tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', */
    /* layer: tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', */
    {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };

  options = {
    layers: [this.LAYER_OSM.layer],
    zoom: 12,
    center: latLng(4.66, -74.1)
  };

  onMapReady(map: Map) {
    this.map = map;

    this.http.get('./assets/geojson/map.geojson').subscribe((json: any) => {
      geoJSON(json).addTo(map);
    });

    this.http.get('./assets/geojson/map_1.geojson').subscribe((json: any) => {
      geoJSON(json).addTo(map);
    });
  }


}
