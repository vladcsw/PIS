export interface DocEnviado{
    id?: number;
    asunto: string;
    documento_prioridad:string;
    documento_clasificacion_id: number;
    fechaObtencion: Date | string;
    documento_persona: string;
    descripcion: string;
}