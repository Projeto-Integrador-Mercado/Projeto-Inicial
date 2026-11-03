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

  sessionStorage.setItem('logado', 'sim');
  sessionStorage.setItem('usuario', usuario);
  window.location.href = 'dashboard.html';
});
