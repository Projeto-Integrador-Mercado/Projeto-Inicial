// Login demonstrativo: usuário e senha fixos (autenticação real fica para o PI).
const USUARIO = 'admin';
const SENHA = '1234';

document.getElementById('formLogin').addEventListener('submit', function (e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro');

  if (!usuario || !senha) {
    erro.textContent = 'Preencha o usuário e a senha.';
    return;
  }
  if (usuario !== USUARIO || senha !== SENHA) {
    erro.textContent = 'Usuário ou senha inválidos.';
    return;
  }
  // guarda que o usuário entrou (some ao fechar a aba)
  sessionStorage.setItem('logado', 'sim');
  window.location.href = 'produtos.html';
});
