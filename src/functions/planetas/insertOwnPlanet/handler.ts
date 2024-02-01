
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { IPlaneta } from 'src/interfaces';

const insertOwnPlanet = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        // Obteniendo los parametros tipandolos basado en nuestro modelo propio
        const newPlaneta = JSON.parse(event.body) as IPlaneta
        const { awsRequestId } = context
        // Generando el id 
        const id = uuidv4();
        //Conectandonos a la BD
        const dynamodb = new DynamoDB.DocumentClient()
        // Definiendo el objeto planeta a almacenar
        const newPlanet: IPlaneta = {
            id:id,
            ...newPlaneta
        }
        // Almacenando el objeto
        // TODO: Validacion de que la información sea completa y suficiente
        const resultado = await dynamodb.put({
            TableName: 'PlanetTable',
            Item: newPlanet
        }).promise()
        // TODO: Mejorar la respuesta del servicio en caso no tenga data y/o ocurra una excepcion
        return {
            statusCode: 200,
            //
            body: JSON.stringify({ awsRequestId, resultado })
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
