export interface PlanoDTO {
    cod_plano: number;      
    tipo_plano: string;     
    duracao_dias: number;  
    valor: number;         
    descricao?: string;     
    status_plano?: string; 
}