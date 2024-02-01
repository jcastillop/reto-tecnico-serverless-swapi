
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { IPlaneta } from 'src/interfaces';

const insertOwnPlanet = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        const newPlaneta = JSON.parse(event.body) as IPlaneta

        const { awsRequestId } = context
        const id = uuidv4();

        const dynamodb = new DynamoDB.DocumentClient()

        const newPlanet = {
            id:id,
            ...newPlaneta
        }
        
        const resultado = await dynamodb.put({
            TableName: 'PlanetTable',
            Item: newPlanet
        }).promise()
	
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
