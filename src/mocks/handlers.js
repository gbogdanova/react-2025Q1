import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://swapi.dev/api/planets/:id/', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      climate: 'temperate',
      created: '2014-12-10T11:35:48.479000Z',
      diameter: '12500',
      edited: '2014-12-20T20:58:18.420000Z',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: '1 standard',
      name: 'Alderaan',
      orbital_period: '364',
      population: '2000000000',
      residents: [
        'https://swapi.dev/api/people/5/',
        'https://swapi.dev/api/people/68/',
        'https://swapi.dev/api/people/81/',
      ],
      rotation_period: '24',
      surface_water: '40',
      terrain: 'grasslands, mountains',
      url: 'https://swapi.dev/api/planets/2/',
    });
  }),
];
