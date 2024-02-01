
import { Context } from 'aws-lambda';
import swApi from '../../../../api/swApi';
import { IPlaneta, IResponsePlanets, PropsResponseServiceFindAll } from 'src/interfaces';
import { IResponsePlanet } from '../../../interfaces/responseSWAPI';
import { Planeta } from 'src/models';


const findAll = async (context: Context) => {

  const { awsRequestId } = context

  try {
    const { data } = await swApi.get<IResponsePlanets>(`https://swapi.py4e.com/api/planets`)

    var arr_planetas:IPlaneta[] = [];
    data.results.forEach((item:IResponsePlanet) => {
      const planeta = Planeta.fromResponsePlanet(item)
      arr_planetas.push(planeta)
    });
    
    const response : PropsResponseServiceFindAll = {
      identificador_aws: awsRequestId,
      cantidad: data.count,
      pagina_siguiente: data.next,
      pagina_previa: data.previous,
      resultado: arr_planetas
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }    
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }        
  }

};

export const main = findAll; 
