import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM } from 'ol/source';

@Component({
  selector: 'gis-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  map = viewChild<ElementRef<HTMLElement>>('map');

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    new Map({
      target: this.map()?.nativeElement,
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      controls: [],
      view: new View({ center: [0, 0], zoom: 2, projection: 'EPSG:3857' })
    });
  }
}
