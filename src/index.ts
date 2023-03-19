import "./estados";
import "./cidades";

class Pessoa {
    constructor(private nome: string, private sobrenome: string, private email: string) {}
    public getNome(): string {
        return this.nome;
    }
    public getSobrenome(): string {
        return this.sobrenome;
    }
    public getEmail(): string {
        return this.email;
    }
}
let pessoas: Pessoa[] = [];
console.log(typeof pessoas);
const formulario = document.querySelector("form") as HTMLFormElement;
formulario.style.textTransform = "upperCase";

function conferirCampos(form: Event): void {
    form.preventDefault();
    const nome = formulario.querySelector("#nome") as HTMLInputElement;
    const sobreNome = formulario.querySelector("#sobrenome") as HTMLInputElement;
    const email = formulario.querySelector("#exampleInputEmail1") as HTMLInputElement;
    let verificarFinal: boolean = true;
    const endereco = formulario.querySelector("#address") as HTMLInputElement;
    const termos = formulario.querySelector("#termos") as HTMLInputElement;

    if (nome.value.length < 1 || sobreNome.value.length < 1) {
        alert("Por favor coloque um nome!!!");
        verificarFinal = false;
        nome.classList.add("bordaErro");
        sobreNome.classList.add("bordaErro");
    }
    if (email.value.includes(".") && email.value.includes("@")) {
    } else {
        alert("Por favor ajuste o email com um valor valido!!!");
        verificarFinal = false;
        email.classList.add("bordaErro");
    }
    if (endereco.value.length < 3) {
        alert("Por favor coloque um endereço válido");
        verificarFinal = false;
        endereco.classList.add("bordaErro");
    }
    if (termos.value !== "sim") {
        alert("Aceite os termos e condições");
        verificarFinal = false;
        termos.classList.add("bordaErro");
    }

    if (verificarFinal) {
        const novaPessoa = new Pessoa(nome.value, sobreNome.value, email.value);
        pessoas.push(novaPessoa);
        console.log(pessoas);
        nome.value = "";
        sobreNome.value = "";
        email.value = "";
        endereco.value = "";

        const verificarInput = document.querySelectorAll("input");
        verificarInput.forEach((item) => {
            if (item instanceof HTMLInputElement) {
                if (item.classList.contains("bordaErro")) {
                    item.classList.remove("bordaErro");
                }
            }
        });

        nome.focus();
        if (verificarFinal) {
            const alerta = document.querySelector(".alert") as HTMLDivElement;
            alerta.style.visibility = "visible";
        }
        setTimeout(() => {
            const alerta = document.querySelector(".alert") as HTMLDivElement;
            alerta.style.visibility = "hidden";
        }, 1000);
        setTimeout(() => {
            document.location.reload();
        }, 1300);
    }
}

formulario.addEventListener("submit", conferirCampos);
