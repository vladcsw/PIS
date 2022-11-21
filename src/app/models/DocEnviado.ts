export interface DocEnviado{
    id?: number;
    asunto: string;
    documento_prioridad:string;
    documento_clasificacion_id: number;
    //fechaObtención: Date;
    documento_persona: string;
    //preguntas: string;
}