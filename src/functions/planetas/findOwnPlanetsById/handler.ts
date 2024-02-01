
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const findAllOwnPlanet = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        // Obteniendo los parametros
        const { id } = event.pathParameters
        const { awsRequestId } = context
        // Conectandose a la DB, el proceso de autentificación fue mediante AWS CLI
        const dynamodb = new DynamoDB.DocumentClient()
        // Ejecutando la consulta de la BD
        const { Item } = await dynamodb.get({
            TableName: 'PlanetTable',
            Key:{
                id: id
            }
        }).promise()
        // TODO: Mejorar la respuesta del servicio en caso no tenga data y/o ocurra una excepcion
        return {
            statusCode: 200,
            body: JSON.stringify({ awsRequestId, Item })
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
