/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addPokemon
   */
  static readonly AddPokemonPath = '/pokemon/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPokemon()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPokemon$Response(params: {
    body: Pokemon
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PokemonControllerService.AddPokemonPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPokemon$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPokemon(params: {
    body: Pokemon
  }): Observable<void> {

    return this.addPokemon$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getPokemonById
   */
  static readonly GetPokemonByIdPath = '/pokemon/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPokemonById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPokemonById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Pokemon>> {

    const rb = new RequestBuilder(this.rootUrl, PokemonControllerService.GetPokemonByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Pokemon>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPokemonById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPokemonById(params: {
    id: number;
  }): Observable<Pokemon> {

    return this.getPokemonById$Response(params).pipe(
      map((r: StrictHttpResponse<Pokemon>) => r.body as Pokemon)
    );
  }

  /**
   * Path part for operation getAllPokemon
   */
  static readonly GetAllPokemonPath = '/pokemon/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPokemon()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPokemon$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Pokemon>>> {

    const rb = new RequestBuilder(this.rootUrl, PokemonControllerService.GetAllPokemonPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Pokemon>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPokemon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPokemon(params?: {
  }): Observable<Array<Pokemon>> {

    return this.getAllPokemon$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Pokemon>>) => r.body as Array<Pokemon>)
    );
  }

}
