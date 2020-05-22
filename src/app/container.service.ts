import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {ManifestElement} from './container';
import {Manifest} from './mock-container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor() { }

  getManifest(): Observable<ManifestElement[]> {
    return of (Manifest);
  }
}
