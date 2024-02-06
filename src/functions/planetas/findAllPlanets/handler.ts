
import { Context } from 'aws-lambda';
import { listarPlanetasSwapi } from 'src/controllers';


const findAll = async (context: Context) => {
  
  try {
    
    const { awsRequestId } = context
    const response = await listarPlanetasSwapi(awsRequestId, '/planets')

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
