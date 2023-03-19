//http://educacao.dadosabertosbr.com/api/cidades/sp cidades
import "./estados";
export default interface CidadeRequest {
    id: number;
    microrregiao: {
        id: string;
        mesorregiao: {
            uf: {
                id: number;
                nome: string;
                regiao: {
                    id: number;
                    nome: string;
                    sigla: string;
                };
            };
        };
    };
    nome: string;
    regiaoIimediata: {
        id: string;
        nome: string;
        regiaoIntermediaria: {
            uf: {
                id: number;
                nome: string;
                regiao: {
                    id: number;
                    nome: string;
                    sigla: string;
                };
                sigla: string;
            };
        };
    };
}
async function fetchDataCidades(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) throw new Error("Erro" + response.status);
        return json;
    } catch (error) {}
}
