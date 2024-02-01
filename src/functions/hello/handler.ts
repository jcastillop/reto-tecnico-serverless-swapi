import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import schema from './schema';
// import { IPlaneta } from 'src/interfaces';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const id = uuidv4();

  try {
    const dynamodb = new DynamoDB.DocumentClient()

    const newTask = {
      id:id,
      title: "hola wapo",
      descrption: "pruebas de servicio"
    }
  
    await dynamodb.put({
      TableName: 'TaskTable',
      Item: newTask
    }).promise()
  
    return formatJSONResponse({
      message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`
    });    
  } catch (error) {
    return formatJSONResponse({
      message: error
    });
  }

};

export const main = middyfy(hello);
