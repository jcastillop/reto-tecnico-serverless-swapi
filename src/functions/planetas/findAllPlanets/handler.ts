
import { Context } from 'aws-lambda';
import swApi from '../../../../api/swApi';
import { IPlaneta, IResponsePlanets, PropsResponseServiceFindAll, IResponsePlanet } from 'src/interfaces';
import { Planeta } from 'src/models';


const findAll = async (context: Context) => {

  const { awsRequestId } = context

  try {
    // Conectando a SWAPI y retornando la data
    // TODO: Validar respuestas erroneas del servicio
    const { data } = await swApi.get<IResponsePlanets>(`https://swapi.py4e.com/api/planets`)
    // Inicializando el array donde almacenaremos la inforamcion de los planetas 
    var arr_planetas:IPlaneta[] = [];
    // Iterando en el resultado de los planetas y adpatandolos al modelo propio
    data.results.forEach((item:IResponsePlanet) => {
      const planeta = Planeta.fromResponsePlanet(item)
      arr_planetas.push(planeta)
    });
    // Tipando la respuesta a realizar
    const response : PropsResponseServiceFindAll = {
      identificador_aws: awsRequestId,
      cantidad: data.count,
      pagina_siguiente: data.next,
      pagina_previa: data.previous,
      resultado: arr_planetas
    }
    // TODO: Crear un logger para registrar los eventos fuera de ACloudWatch
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }    
  } catch (error) {
    // TODO: Mejorar el tratamiento de errores diferenciando los status code
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }        
  }

};

export const main = findAll; 
