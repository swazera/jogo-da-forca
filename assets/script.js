var escolhasDePalavras = [
    'forca',
    'leão',
    'capitão',
    'gato',
    'salvar',
    'configurações',
    'cachorro',
    'entrar',
    'faculdade',
    'console',
    'idade',
    'maça',
    'coração',
    'excluir',
    'despertador',
    'casa',
    'compartilhar',
    'cidade',
    'garrafa',
    'água',
    'celular',
    'caderno',
    'monitor',
    'software',
    'caixa',
    'mamadeira',
    'melancia',
    'internet',
    'sapato',
    'liquidificador'
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