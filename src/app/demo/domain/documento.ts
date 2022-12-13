export interface documento{
    id?: number;
    asunto?: string;
    codigo?:string;
    instructor?:string;
    situcacion?:string;
    tipoDocumento?:string;
    documento_persona?: string;
    documento_prioridad_id?: string;
    documento_clasificacion_id?: number;
    prioridad?: number;
    obtencionInformacion?: string;
    documento_estado_id?: number;
    documento_caracteristica_id?: number;
    id_dcumento_padre?: number;
    descripcion?: string;
    carpeta_id?:number;
}
