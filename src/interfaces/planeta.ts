export interface IPlaneta{
    id?:                string;
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
}

export interface PropsResponseServiceFindAllExternal{
    identificador_aws:  string;
    cantidad:           number;
    pagina_siguiente:   string;
    pagina_previa:      string;
    resultado:          IPlaneta[];
}
export interface PropsResponseServiceFindAll{
    identificador_aws:  string;
    cantidad:           number;
    pagina_siguiente:   string;
    pagina_previa:      string;
    resultado:          IPlaneta[];
}

export interface PropsResponseServiceFind{
    identificador_aws:  string;
    resultado:          IPlaneta;
}
