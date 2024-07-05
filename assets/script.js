var escolhasDePalavras = [
    'forca','leão','capitão','gato','salvar','configurações','cachorro','entrar','faculdade','console','idade',
    'maça','coração','excluir','despertador','casa','compartilhar','cidade','garrafa','água','celular',
    'caderno','monitor','software','caixa','mamadeira','melancia','internet','sapato','liquidificador',
    'amor','branco','copo','noite','ovo','parque','peixe','rato','pai','coelho','otorrinolaringologista',
    'sino','campeonato','moeda','pedreiro','serenata','formiga','pneumonia','menta','caatinga'
  ];

var resultado = 0;
var palavraEscolhida = '';
var palpites = '';
var letrasErradas = '';
var palavra = document.querySelector('#palavra');
var palpite = document.querySelector('#palpite');
var erros = document.querySelector('#erros');
var homem = document.querySelectorAll('.homem div');

function gerarPalavraEscolhida() {
  palavraEscolhida = escolhasDePalavras[Math.floor(Math.random() * escolhasDePalavras.length)];
}

function gerarPalavraComPalpites() {
  var palavraComPalpites = '';
  var jogoTerminado = true;

  for (var i = 0; i < palavraEscolhida.length; i++) {
    if (palavraEscolhida[i] != ' ') {
      if (palpites.toUpperCase().indexOf(palavraEscolhida[i].toUpperCase()) >= 0) {
        palavraComPalpites += palavraEscolhida[i].toUpperCase() + '&nbsp;';
      }
      else {
        palavraComPalpites += '_&nbsp;';
        jogoTerminado = false;
      }
    }
    else {
      palavraComPalpites += '&nbsp;&nbsp;';
    }
  }

  palavra.innerHTML = 'PALAVRA: ' + palavraComPalpites;

  if (jogoTerminado) {
    resultado = 1;
  }
}

function gerarErros() {
  var letrasPerdidas = '';

  for (var i = 0; i < homem.length; i++) {
    homem[i].style.display = 'none';
  }

  for (var i = 0; i < letrasErradas.length; i++) {
    document.querySelector('.homem-' + (i + 1)).style.display = 'block';
    letrasPerdidas += letrasErradas[i] + ', ';
  }

  letrasPerdidas = letrasPerdidas.substring(0, letrasPerdidas.length - 2);
  erros.innerHTML = 'ERROS: ' + letrasPerdidas;

  if (letrasErradas.length >= 6) {
    resultado = 2;
  }
}

function iniciarJogo() {
  resultado = 0;
  palavraEscolhida = '';
  palpites = '';
  letrasErradas = '';

  palavra.innerText = '';
  palpite.value = '';
  erros.innerText = '';

  gerarPalavraEscolhida();
  gerarPalavraComPalpites();
  gerarErros();

  palpite.disabled = false;
}

iniciarJogo();

palpite.addEventListener('keypress', function(evt) {
  if (evt.keyCode === 13) {
    if (resultado === 0) {
      if (palavraEscolhida.toUpperCase().indexOf(palpite.value.toUpperCase()) >= 0) {
        palpites += palpite.value.toUpperCase();
      } else {
        if (letrasErradas.toUpperCase().indexOf(palpite.value.toUpperCase()) < 0) {
          letrasErradas += palpite.value.toUpperCase();
        }
      }

      palpite.value = '';

      gerarPalavraComPalpites();
      gerarErros();

      if (resultado === 1) {
        palpite.disabled = true;
        if (confirm('Você ganhou :D.  Você teve ' + letrasErradas.length + ' erros.')) {
          iniciarJogo();
        }
      } else if (resultado === 2) {
        palpite.disabled = true;
        if (confirm('Você perdeu :(.  A resposta era "' + palavraEscolhida + '".')) {
          iniciarJogo();
        }
      }
    }
  }
});