export default function Lista({ tarefas, onAlternar, onRemover }) {
  if (tarefas.length === 0) {
    return (
      <div className="lista-vazia">
        <span aria-hidden="true">✦</span>
        <strong>Nenhuma tarefa por enquanto</strong>
        <p>Adicione sua primeira tarefa no campo acima.</p>
      </div>
    );
  }

  return (
    <section className="secao-lista" aria-label="Lista de tarefas">
      <h2>Suas tarefas <span>{tarefas.length}</span></h2>
      <ul className="lista">
        {tarefas.map((tarefa) => (
          <li className={`item-tarefa ${tarefa.concluida ? 'concluida' : ''}`} key={tarefa.id}>
            <label className="tarefa-label">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => onAlternar(tarefa.id)}
              />
              <span className="check-personalizado" aria-hidden="true"></span>
              <span className="texto-tarefa">{tarefa.texto}</span>
            </label>
            <button
              className="botao-remover"
              type="button"
              onClick={() => onRemover(tarefa.id)}
              aria-label={`Remover tarefa: ${tarefa.texto}`}
              title="Remover tarefa"
            >×</button>
          </li>
        ))}
      </ul>
    </section>
  );
}