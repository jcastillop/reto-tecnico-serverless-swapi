import { handlerPath } from '../../../libs/handler-resolver'

export const insertOwnPlanet = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'planetas/insertOwnPlanet'
      },
    },
  ],
};
