import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, Map, tileLayer, geoJSON, Control, layerGroup } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {

  control = new Control.Layers();

  constructor(private http: HttpClient) {
  };

  // Base Layer
  options = {
    layers: [tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })],
    zoom: 12,
    center: latLng(4.66, -74.1)
  };

  onMapReady(map: Map) {
    // Base layer controls
    this.http.get('./assets/geojson/maps.geojson').subscribe((maps: any) => {
      for (let map of maps) {
        this.control.addBaseLayer(tileLayer(map.url, { maxZoom: map.maxZoom }), map.title)
      }
    });

    // Overlay controls
    this.http.get('./assets/geojson/circles.geojson').subscribe((json: any) => {
      this.control.addOverlay(geoJSON(json).addTo(layerGroup()), json.title);
    });
    this.http.get('./assets/geojson/squares.geojson').subscribe((json: any) => {
      this.control.addOverlay(geoJSON(json).addTo(layerGroup()), json.title);
    });

    // Add controls
    this.control.addTo(map);
  }

}
