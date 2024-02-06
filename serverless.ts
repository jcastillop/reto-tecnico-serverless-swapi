import type { AWS } from '@serverless/typescript';

import { insertOwnPlanet, findAllPlanets, findOwnPlanetsById } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'sls-reto-tecnico',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region:'us-west-2',
    iamRoleStatements:[
      {
        Effect:'Allow',
        Action:[
          'dynamodb:*'
        ],
        Resource: 'arn:aws:dynamodb:us-west-2:890135728113:table/PlanetTable'
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SWAPI: 'https://swapi.py4e.com/api',
    },
  },
  // import the function via paths
  functions: { insertOwnPlanet, findAllPlanets, findOwnPlanetsById },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      PlanetTable:{
        Type: 'AWS::DynamoDB::Table',
        Properties:{
          TableName: 'PlanetTable',
          BillingMode:'PAY_PER_REQUEST',
          AttributeDefinitions:[
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }           
          ],
          KeySchema:[
            {
              AttributeName: 'id',
              KeyType: 'HASH'              
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
