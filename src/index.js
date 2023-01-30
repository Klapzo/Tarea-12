
var currencies;

const $botonEnviar = document.querySelector(".btn");

function requestMonedas() {
	fetch("https://api.frankfurter.app/currencies")
		.then((respuesta) => respuesta.json())

		.then(function (data) {
			currencies = data;
		})
		.then(() => crearOpciones())
		.catch(error => console.error(error));

}

function main() {
	requestMonedas();
}

$botonEnviar.onclick = function (event) {
	event.preventDefault();

	if (!validarFormulario()) {
		return;
	}

	limpiarUnorderedList();
	requestApi(armarURL());
	actualizarTextoResultados();
};

function armarURL() {
	let urlBase = "https://api.frankfurter.app";

	let $fecha = document.querySelector("input").value;
	let $moneda = document.querySelector("select").value;

	url = urlBase += `/${$fecha}?from=${$moneda}`;
	return url;
}

function requestApi(url) {
	fetch(url)
		.then((respuesta) => respuesta.json())

		.then(function (data) {
			crearListItems(data);
		});
}

function crearListItems(data) {
	let $ulresultados = document.querySelector(".resultados");
	Object.entries(data.rates).forEach((parMoneda) => {
		$li = document.createElement("li");
		$strong = document.createElement("strong");
		$strong.innerText = parMoneda[0]
		$li.appendChild($strong)
		$li.innerHTML += `: ${parMoneda[1]}`
		$ulresultados.appendChild($li);
	});
}

function crearOpciones() {
	let $select = document.querySelector(".selector-monedas");
	Object.keys(currencies).forEach((key) => {
		$option = document.createElement("option");
		$option.value = key;
		$option.innerText = key;
		$select.appendChild($option);
	});
}

function validarFormulario() {
	$inputsUsuario = document.querySelectorAll("input");
	$fecha = $inputsUsuario[0];
	if (validarFecha($fecha)) {
		actualizarTextoError("");
		return true;
	} else {
		return false;
	}
}

function validarFecha($fecha) {
	if ($fecha.value) {
		$fecha.id = "";
		return true;
	} else {
		$fecha.id = "input-invalido";
		actualizarTextoError("input inválido. ");
		return false;
	}
}

function limpiarUnorderedList() {
	let $ul = document.querySelector(".resultados");
	$ul.innerHTML = "";
}

function actualizarTextoResultados() {
	let $textoResultados = document.querySelector("#texto-resultados");
	let $fecha = new Date(document.querySelector("input").value).toDateString();
	let $moneda = currencies[document.querySelector("select").value];

	$textoResultados.innerText = `cambios del ${$fecha} en ${$moneda}`;
}
function actualizarTextoError(texto) {
	let $textoError = document.querySelector("#texto-error");
	$textoError.innerText = texto;
}

main();
