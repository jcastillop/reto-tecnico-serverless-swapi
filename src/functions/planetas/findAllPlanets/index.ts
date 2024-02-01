import { handlerPath } from '@libs/handler-resolver';

export const findAllPlanets = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'planetas/findAllPlanets'
      },
    },
  ],
};
