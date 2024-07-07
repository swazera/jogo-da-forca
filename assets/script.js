var palavrasPredefinidas = [
  'forca','leão','capitão','gato','salvar','configurações','cachorro','entrar','faculdade','console','idade',
  'maça','coração','excluir','despertador','casa','compartilhar','cidade','garrafa','água','celular',
  'caderno','monitor','software','caixa','mamadeira','melancia','internet','sapato','liquidificador',
  'amor','branco','copo','noite','ovo','parque','peixe','rato','pai','coelho','otorrinolaringologista',
  'sino','campeonato','moeda','pedreiro','serenata','formiga','pneumonia','menta','caatinga'
];

var escolhasDePalavras = JSON.parse(localStorage.getItem('palavras')) || [];

var resultado = 0;
var palavraEscolhida = '';
var palpites = '';
var letrasErradas = '';
var palavra = document.querySelector('#palavra');
var palpite = document.querySelector('#palpite');
var erros = document.querySelector('#erros');
var homem = document.querySelectorAll('.homem div');

// selecionando elementos do modal
var modal = document.getElementById("dialogo");
var btnAbrirDialogo = document.getElementById("abrir-dialogo");
var btnIniciarJogo = document.getElementById("iniciar-jogo");
var spanFechar = document.getElementsByClassName("fechar")[0];

btnAbrirDialogo.onclick = function() {
  modal.style.display = "block";
}

spanFechar.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function gerarPalavraEscolhida(listaDePalavras) {
  palavraEscolhida = listaDePalavras[Math.floor(Math.random() * listaDePalavras.length)];
}

function gerarPalavraComPalpites() {
  var palavraComPalpites = '';
  var jogoTerminado = true;

  for (var i = 0; i < palavraEscolhida.length; i++) {
    if (palavraEscolhida[i] != ' ') {
      if (palpites.toUpperCase().indexOf(palavraEscolhida[i].toUpperCase()) >= 0) {
        palavraComPalpites += palavraEscolhida[i].toUpperCase() + '&nbsp;';
      } else {
        palavraComPalpites += '_&nbsp;';
        jogoTerminado = false;
      }
    } else {
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
    if (i < homem.length) {
      document.querySelector('.homem-' + (i + 1)).style.display = 'block';
    }
    letrasPerdidas += letrasErradas[i] + ', ';
  }

  letrasPerdidas = letrasPerdidas.substring(0, letrasPerdidas.length - 2);
  erros.innerHTML = 'ERROS: ' + letrasPerdidas;

  if (letrasErradas.length >= 6) {
    setTimeout(function() {
      resultado = 2;
      palpite.disabled = true;
      if (confirm('Você perdeu :(.  A resposta era "' + palavraEscolhida + '".')) {
        iniciarJogo(escolhasDePalavras);
      }
    }, 100);
  }
}

function iniciarJogo(listaDePalavras) {
  resultado = 0;
  palavraEscolhida = '';
  palpites = '';
  letrasErradas = '';

  palavra.innerText = '';
  palpite.value = '';
  erros.innerText = '';

  gerarPalavraEscolhida(listaDePalavras);
  gerarPalavraComPalpites();
  gerarErros();

  palpite.disabled = false;
}

function salvarNovasPalavras(event) {
  event.preventDefault();
  var novasPalavrasTexto = document.getElementById('novas-palavras').value.trim();
  if (novasPalavrasTexto) {
    var novasPalavras = novasPalavrasTexto.split(/[\s,]+/);  // Divide por vírgula
    escolhasDePalavras = escolhasDePalavras.concat(novasPalavras);
    localStorage.setItem('palavras', JSON.stringify(escolhasDePalavras));
    document.getElementById('novas-palavras').value = '';
    modal.style.display = "none";
    alert('Palavras salvas!');
    iniciarJogo(novasPalavras);
  } else {
    alert('Insira pelo menos uma palavra válida.');
  }
}

document.getElementById('form-cadastro').addEventListener('submit', salvarNovasPalavras);
btnIniciarJogo.onclick = function() {
  iniciarJogo(palavrasPredefinidas);
};

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
          iniciarJogo(escolhasDePalavras);
        }
      }
    }
  }
});
