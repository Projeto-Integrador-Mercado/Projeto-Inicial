// Acesso demonstrativo: sem autenticação real ou perfis individuais.
const USUARIOS = ['Richard', 'Dorsa', 'Gabriel', 'Victor'];
const SENHA = '1234';

document.getElementById('formLogin').addEventListener('submit', function (e) {
  e.preventDefault();
  const informado = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro');
  erro.textContent = '';

  if (!informado || !senha) {
    erro.textContent = 'Preencha o usuário e a senha.';
    return;
  }
  const usuario = USUARIOS.find(nome => nome.toLowerCase() === informado.toLowerCase());
  if (!usuario || senha !== SENHA) {
    erro.textContent = 'Usuário ou senha inválidos.';
    return;
  }

  sessionStorage.setItem('logado', 'sim');
  sessionStorage.setItem('usuario', usuario);
  window.location.href = 'dashboard.html';
});
