import { IPlaneta, IResponsePlanet } from "src/interfaces";

export class Planeta implements IPlaneta{
    id:                 string;
    clima:              string;
    diametro:           string;
    peliculas:          string[];
    gravedad:           string;
    nombre:             string;
    periodo_orbital:    string;
    poblacion:          string;
    residentes:         string[];
    periodo_rotacion:   string;
    superficie_agua:    string;
    terreno:            string;

    creado:             string;
    editado:            string;
    url:                string;

    constructor(clima, diametro, peliculas, gravedad, nombre, periodo_orbital, poblacion, residentes, periodo_rotacion, superficie_agua, terreno, creado, editado, url) {
      this.clima = clima;
      this.diametro = diametro;
      this.peliculas = peliculas;
      this.gravedad = gravedad;
      this.nombre = nombre;
      this.periodo_orbital = periodo_orbital;
      this.poblacion = poblacion;
      this.residentes = residentes;
      this.periodo_rotacion = periodo_rotacion;
      this.superficie_agua = superficie_agua;
      this.terreno = terreno;
      
      this.creado = creado;
      this.editado = editado;
      this.url = url;      
    }
    static fromResponsePlanet(rspPlanet: IResponsePlanet){
        return new Planeta(
            rspPlanet.climate,
            rspPlanet.diameter,
            rspPlanet.films,
            rspPlanet.gravity,
            rspPlanet.name,
            rspPlanet.orbital_period,
            rspPlanet.population,
            rspPlanet.residents,
            rspPlanet.rotation_period,
            rspPlanet.surface_water,
            rspPlanet.terrain,
            rspPlanet.created,
            rspPlanet.edited,
            rspPlanet.url   
        )
        
    }
}