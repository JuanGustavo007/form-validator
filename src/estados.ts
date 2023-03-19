import "./cidades";
import CidadeRequest from "./cidades";
interface Estado {
    adminCode1: string;
    adminCodes1: {
        ISO3166_2: string;
    };
    adminName1: string;
    countryCode: string;
    countryId: string;
    countryName: string;
    fcl: string;
    fclName: string;
    fcode: string;
    fcodeName: string;
    geonameId: number;
    lat: string;
    lng: string;
    name: string;
    population: number;
    toponymName: string;
}
interface Geo {
    geonames: [];
}

//https://viacep.com.br/ws/01001000/json/ cep detalhado
//http://www.geonames.org/childrenJSON?geonameId=3469034 //estados

let valores: Estado[] = [];

async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) throw new Error("Erro" + response.status);
        return json;
    } catch (error) {}
}

async function listarEstados() {
    const dados: Geo = await fetchData("http://www.geonames.org/childrenJSON?geonameId=3469034 ");
    // console.log(dados.geonames);

    dados.geonames.forEach((item) => {
        valores.push(item);
    });
    valores.forEach((i) => {
        // console.log(i);
        const elementoOption = document.createElement("option") as HTMLOptionElement;
        elementoOption.innerText = i.name;
        elementoOption.value = i.adminCodes1.ISO3166_2;
        const selectItens = document.querySelector("#state") as HTMLSelectElement;

        selectItens.appendChild(elementoOption);
        elementoOption.onclick = function () {
            console.log("daskdkasdkask");
        };
    });
    const selecionarEstados: NodeListOf<HTMLOptionElement> = document.querySelectorAll("#state option");
    console.log(selecionarEstados);
    const unicoSelect = document.querySelector("#state") as HTMLSelectElement;
    unicoSelect.addEventListener("click", () => {
        unicoSelect.addEventListener("change", () => {
            listarCidades(`${unicoSelect.value}`);
        });
    });
}

listarEstados();
valores.forEach((i) => {
    // console.log(i);
});

async function fetchDataCidades(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) throw new Error("Erro" + response.status);
        return json;
    } catch (error) {}
}

async function listarCidades(estado: string) {
    const dadosCidades: CidadeRequest[] = await fetchDataCidades(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);

    let selecionarSelect2: NodeListOf<HTMLOptionElement> = document.querySelectorAll("#municipio option");
    let selecionarSelect = document.querySelector("#municipio") as HTMLSelectElement;
    console.log(selecionarSelect2);
    selecionarSelect2.forEach((element) => {
        if (element.classList.contains("esta")) {
            selecionarSelect.removeChild(element);
        }
    });

    dadosCidades.forEach((item) => {
        let criarOpcao = document.createElement("option") as HTMLOptionElement;
        criarOpcao.value = item.nome;
        criarOpcao.innerText = item.nome;
        criarOpcao.classList.add("esta");
        console.log(criarOpcao);
        let selecionarSelect = document.querySelector("#municipio") as HTMLSelectElement;
        // selecionarSelect.innerHTML += `<option value="${item.nome}">${item.nome}</option>`;
        selecionarSelect.appendChild(criarOpcao);
    });
    const selecionarFormulario = document.querySelector("form") as HTMLFormElement;
    selecionarFormulario.addEventListener("submit", () => {
        const selecionarSelectEstado: NodeListOf<HTMLOptionElement> = document.querySelectorAll("#state option");
        const selecionarMunicipio: NodeListOf<HTMLOptionElement> = document.querySelectorAll("#state option");

        selecionarSelectEstado.forEach((item) => {
            const selecionarEstado = document.querySelector("#state") as HTMLSelectElement;
            selecionarEstado.childNodes.forEach((i) => {
                if ((item.value = "selecione")) {
                    selecionarEstado.selectedIndex;
                }
            });
        });
    });
}
