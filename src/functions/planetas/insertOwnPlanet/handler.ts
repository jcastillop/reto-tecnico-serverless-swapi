import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { guardarPlaneta } from 'src/controllers';

import { IPlaneta } from 'src/interfaces';

const insertOwnPlanet = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        // Obteniendo los parametros tipandolos basado en nuestro modelo propio
        const newPlaneta = JSON.parse(event.body) as IPlaneta
        const { awsRequestId } = context
        // Generando el id 
        const response = await guardarPlaneta(awsRequestId, newPlaneta)
        // TODO: Mejorar la respuesta del servicio en caso no tenga data y/o ocurra una excepcion
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };  
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error
            })
        }
    }

};

export const main = insertOwnPlanet; 
