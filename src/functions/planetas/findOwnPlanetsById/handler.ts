import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { encontrarPlaneta } from 'src/controllers';

const findAllOwnPlanet = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        // Obteniendo los parametros
        const { id } = event.pathParameters
        const { awsRequestId } = context

        const response = await encontrarPlaneta(awsRequestId, id)
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

export const main = findAllOwnPlanet; 
