import { handlerPath } from '../../../libs/handler-resolver'

export const findOwnPlanetsById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'planetas/findOwnPlanetsById/{id}'
      },
    },
  ],
};
