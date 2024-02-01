
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const findAllOwnPlanet = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        const { id } = event.pathParameters
        const { awsRequestId } = context

        const dynamodb = new DynamoDB.DocumentClient()

        const { Item } = await dynamodb.get({
            TableName: 'PlanetTable',
            Key:{
                id: id
            }
        }).promise()
	
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
