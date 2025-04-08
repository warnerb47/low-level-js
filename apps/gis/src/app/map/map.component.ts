import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Geolocation, Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'gis-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  mapElement = viewChild<ElementRef<HTMLElement>>('map');
  map: Map | null = null;
  geolocaion: Geolocation | null = null;
  projection = 'EPSG:3857';
  positionFeature = new Feature();
  accurencyFeature = new Feature();
  positionLayer: VectorLayer | null = null;

  ngAfterViewInit(): void {
    this.map = this.initMap();
    this.geolocaion = this.getGeolocation();
    this.positionFeature.setStyle(this.getBaseUserFeatureStyle());
    this.handleGeolocationChange();
    this.positionLayer = this.getPositionLayer();
    this.map?.addLayer(this.positionLayer as BaseLayer);
  }

  initMap() {
    const map = new Map({
      target: this.mapElement()?.nativeElement,
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      controls: [],
      view: new View({ center: [0, 0], zoom: 2, projection: this.projection })
    });
    return map;
  }

  getGeolocation() {
    const geolocation = new Geolocation({
      projection: this.map?.getView().getProjection(),
      tracking: true,
    });
    return geolocation;
  }

  handleGeolocationChange() {
    this.geolocaion?.on('change:position', () => {
      const coordinates = this.geolocaion?.getPosition();
      if (coordinates) {
        this.positionFeature?.setGeometry(new Point(coordinates));
      }
    });
    this.geolocaion?.on('change:accuracy', () => {
      this.accurencyFeature?.setGeometry(this.geolocaion?.getAccuracyGeometry() ?? undefined);
    });
  }

  getPositionLayer() {
    const layer = new VectorLayer({
      source: new VectorSource({
        features: [
          this.positionFeature, this.accurencyFeature
        ]
      }),
    });
    return layer;
  }

  getBaseUserFeatureStyle() {
    const style = new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: '#3399CC' }),
        stroke: new Stroke({ color: '#fff', width: 2 }),
      })
    });
    return style;
  }
}
