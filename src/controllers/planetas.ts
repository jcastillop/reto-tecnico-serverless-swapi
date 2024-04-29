import swApi from "api/swApi";
import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';
import { Planeta } from "src/models";
import { IResponsePlanets, IPlaneta, IResponsePlanet, PropsResponseServiceFindAllExternal, PropsResponseServiceFind } from "src/interfaces";

export const listarPlanetasSwapi = async (awsRequestId: string, url: string): Promise<PropsResponseServiceFindAllExternal | null> => {
    try {
        // Conectando a SWAPI y retornando la data 
        // TODO: Validar respuestas erroneas del servicio 
        // TODO: Crear un logger para registrar los eventos fuera de ACloudWatch 
        const { data } = await swApi.get<IResponsePlanets>(`${process.env.SWAPI}${url}`)
        var arr_planetas:IPlaneta[] = [];
        data.results.forEach((item:IResponsePlanet) => {
            const planeta = Planeta.fromResponsePlanet(item)
            arr_planetas.push(planeta)
        });

        return {
            identificador_aws: awsRequestId,
            cantidad: data.count,
            pagina_siguiente: data.next,
            pagina_previa: data.previous,
            resultado: arr_planetas
        }        
    } catch (error) {
        console.log(error)
        return null
    }
}

export const encontrarPlaneta = async (awsRequestId: string, id: string): Promise<PropsResponseServiceFind | null> => {

        try {
            // Conectandose a la DB, el proceso de autentificación fue mediante AWS CLI
            const dynamodb = new DynamoDB.DocumentClient()
            // Ejecutando la consulta de la BD
            const result = await dynamodb.get({
                TableName: 'PlanetTable',
                Key:{
                    id: id
                }
            }).promise()

            return{
                identificador_aws: awsRequestId,
                resultado: result.Item as IPlaneta
            }            
        } catch (error) {
            console.log(error)
            return null            
        }

}

export const guardarPlaneta = async (awsRequestId: string, planeta:IPlaneta) => {

    try {
        const id = uuidv4();
        //Conectandonos a la BD
        const dynamodb = new DynamoDB.DocumentClient()
        // Definiendo el objeto planeta a almacenar
        planeta.id = id
        // Almacenando el objeto
        // TODO: Validacion de que la información sea completa y suficiente
        const resultado = await dynamodb.put({
            TableName: 'PlanetTable',
            Item: planeta
        }).promise()      

        return{
            identificador_aws: awsRequestId,
            resultado: resultado
        }                  
    } catch (error) {
        console.log(error)
        return null              
    }
 
}