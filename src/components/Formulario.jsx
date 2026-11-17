import { useState } from 'react';

export default function Formulario({ onAdicionar }) {
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState('');

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      setErro('Digite uma tarefa antes de adicionar.');
      return;
    }

    onAdicionar(textoLimpo);
    setTexto('');
    setErro('');
  };

  return (
    <form className="formulario" onSubmit={enviarFormulario}>
      <label htmlFor="nova-tarefa">Nova tarefa</label>
      <div className="campo-acoes">
        <input
          id="nova-tarefa"
          type="text"
          value={texto}
          onChange={(evento) => {
            setTexto(evento.target.value);
            if (erro) setErro('');
          }}
          placeholder="Ex.: estudar React"
          aria-describedby={erro ? 'erro-tarefa' : undefined}
        />
        <button type="submit">Adicionar <span aria-hidden="true">＋</span></button>
      </div>
      {erro && <p className="mensagem-erro" id="erro-tarefa">{erro}</p>}
    </form>
  );
}