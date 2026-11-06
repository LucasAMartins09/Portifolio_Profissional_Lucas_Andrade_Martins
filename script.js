// ===== TEMA CLARO / ESCURO =====
var pagina = document.documentElement;
var botaoTema = document.getElementById("botaoTema");

// Se a pessoa já escolheu um tema antes, usa o mesmo
var temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "escuro" || temaSalvo === "claro") {
  pagina.setAttribute("data-tema", temaSalvo);
}

botaoTema.addEventListener("click", function () {
  var temaAtual = pagina.getAttribute("data-tema");
  var novoTema = "escuro";

  if (temaAtual === "escuro") {
    novoTema = "claro";
  }

  pagina.setAttribute("data-tema", novoTema);
  localStorage.setItem("tema", novoTema);
});


// ===== MENU NO CELULAR =====
var botaoMenu = document.getElementById("botaoMenu");
var listaMenu = document.getElementById("listaMenu");

botaoMenu.addEventListener("click", function () {
  listaMenu.classList.toggle("aberto");
});

// Fecha o menu quando clica em algum link
var linksDoMenu = document.querySelectorAll(".menu-links a");
for (var i = 0; i < linksDoMenu.length; i++) {
  linksDoMenu[i].addEventListener("click", function () {
    listaMenu.classList.remove("aberto");
  });
}


// ===== TEXTO DIGITADO NA APRESENTAÇÃO =====
var textoDigitado = document.getElementById("textoDigitado");

var frases = [
  "Técnico em Informática",
  "Estudante de Desenvolvimento Web",
  "Entusiasta de Robótica e Automação",
  "Aprendendo Lógica de Programação"
];

var fraseAtual = 0;
var letraAtual = 0;
var apagando = false;

function escrever() {
  var frase = frases[fraseAtual];

  // Escreve uma letra a mais ou apaga uma letra
  if (apagando) {
    letraAtual = letraAtual - 1;
  } else {
    letraAtual = letraAtual + 1;
  }

  textoDigitado.textContent = frase.substring(0, letraAtual);

  var tempo = 70;
  if (apagando) {
    tempo = 40;
  }

  if (!apagando && letraAtual === frase.length) {
    // Terminou de escrever: espera um pouco e começa a apagar
    apagando = true;
    tempo = 1800;
  } else if (apagando && letraAtual === 0) {
    // Terminou de apagar: vai para a próxima frase
    apagando = false;
    fraseAtual = fraseAtual + 1;

    if (fraseAtual === frases.length) {
      fraseAtual = 0;
    }
  }

  setTimeout(escrever, tempo);
}

escrever();


// ===== SEÇÕES APARECENDO AO ROLAR A PÁGINA =====
var secoes = document.querySelectorAll(".aparecer");

function mostrarSecoes() {
  for (var i = 0; i < secoes.length; i++) {
    var distanciaDoTopo = secoes[i].getBoundingClientRect().top;

    if (distanciaDoTopo < window.innerHeight - 100) {
      secoes[i].classList.add("visivel");
    }
  }
}

window.addEventListener("scroll", mostrarSecoes);
mostrarSecoes();


// ===== CARTÕES DOS PROJETOS INCLINANDO COM O MOUSE =====
var cartoes = document.querySelectorAll(".projeto");

for (var i = 0; i < cartoes.length; i++) {

  cartoes[i].addEventListener("mousemove", function (evento) {
    var cartao = evento.currentTarget;
    var medidas = cartao.getBoundingClientRect();

    // Posição do mouse dentro do cartão
    var x = evento.clientX - medidas.left;
    var y = evento.clientY - medidas.top;

    // Quanto o cartão vai inclinar (no máximo 5 graus)
    var giroY = (x / medidas.width - 0.5) * 10;
    var giroX = (y / medidas.height - 0.5) * -10;

    cartao.style.transform = "perspective(600px) rotateX(" + giroX + "deg) rotateY(" + giroY + "deg)";
  });

  cartoes[i].addEventListener("mouseleave", function (evento) {
    evento.currentTarget.style.transform = "none";
  });
}


// ===== AVISO "MENSAGEM ENVIADA" =====
var avisoFundo = document.getElementById("avisoFundo");
var avisoFechar = document.getElementById("avisoFechar");
var avisoOk = document.getElementById("avisoOk");

function fecharAviso() {
  avisoFundo.classList.remove("aberto");
}

avisoFechar.addEventListener("click", fecharAviso);
avisoOk.addEventListener("click", fecharAviso);

// Clicar fora da caixinha também fecha
avisoFundo.addEventListener("click", function (evento) {
  if (evento.target === avisoFundo) {
    fecharAviso();
  }
});


// ===== FORMULÁRIO DE CONTATO =====
var formulario = document.getElementById("formulario");
var campoNome = document.getElementById("nome");
var campoTelefone = document.getElementById("telefone");
var campoEmail = document.getElementById("email");
var campoMensagem = document.getElementById("mensagem");
var contador = document.getElementById("contador");

// Coloca o telefone no formato (00) 00000-0000 enquanto digita
campoTelefone.addEventListener("input", function () {
  var numeros = campoTelefone.value.replace(/\D/g, "");
  numeros = numeros.substring(0, 11);

  var telefone = "";

  if (numeros.length > 0) {
    telefone = "(" + numeros.substring(0, 2);
  }
  if (numeros.length >= 3) {
    telefone = telefone + ") " + numeros.substring(2, 7);
  }
  if (numeros.length >= 8) {
    telefone = telefone + "-" + numeros.substring(7, 11);
  }

  campoTelefone.value = telefone;
});

// Mostra quantas letras já foram digitadas na mensagem
campoMensagem.addEventListener("input", function () {
  contador.textContent = campoMensagem.value.length;
});

function mostrarErro(campo, idDoErro, texto) {
  campo.classList.add("invalido");
  document.getElementById(idDoErro).textContent = texto;
}

function limparErro(campo, idDoErro) {
  campo.classList.remove("invalido");
  document.getElementById(idDoErro).textContent = "";
}

formulario.addEventListener("submit", function (evento) {
  // Impede a página de recarregar
  evento.preventDefault();

  var tudoCerto = true;

  // Nome: pelo menos 3 letras
  if (campoNome.value.trim().length < 3) {
    mostrarErro(campoNome, "erroNome", "Digite seu nome completo.");
    tudoCerto = false;
  } else {
    limparErro(campoNome, "erroNome");
  }

  // Telefone: pelo menos 10 números
  var numerosDoTelefone = campoTelefone.value.replace(/\D/g, "");
  if (numerosDoTelefone.length < 10) {
    mostrarErro(campoTelefone, "erroTelefone", "Telefone incompleto. Ex: (31) 99999-9999.");
    tudoCerto = false;
  } else {
    limparErro(campoTelefone, "erroTelefone");
  }

  // E-mail: precisa ter @ e ponto
  var temArroba = campoEmail.value.indexOf("@") > 0;
  var temPonto = campoEmail.value.indexOf(".") > 0;
  if (!temArroba || !temPonto) {
    mostrarErro(campoEmail, "erroEmail", "Digite um e-mail válido.");
    tudoCerto = false;
  } else {
    limparErro(campoEmail, "erroEmail");
  }

  // Mensagem: pelo menos 10 letras
  if (campoMensagem.value.trim().length < 10) {
    mostrarErro(campoMensagem, "erroMensagem", "Conte um pouco mais na mensagem (mín. 10 caracteres).");
    tudoCerto = false;
  } else {
    limparErro(campoMensagem, "erroMensagem");
  }

  // Se algo estiver errado, para por aqui
  if (!tudoCerto) {
    return;
  }

  // Tudo certo: mostra o aviso e limpa o formulário
  document.getElementById("avisoNome").textContent = campoNome.value.trim();
  avisoFundo.classList.add("aberto");

  formulario.reset();
  contador.textContent = "0";
});


// ===== ANO NO RODAPÉ =====
document.getElementById("ano").textContent = new Date().getFullYear();
