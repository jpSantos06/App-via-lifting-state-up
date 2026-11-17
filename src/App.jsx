import { useEffect, useState } from 'react';
import Formulario from './components/Formulario.jsx';
import Lista from './components/Lista.jsx';

export default function App() {
  // O estado fica no componente pai e é compartilhado com os filhos via props.
  const [tarefas, setTarefas] = useState([]);
  const [segundos, setSegundos] = useState(0);

  const adicionarTarefa = (texto) => {
    const novaTarefa = {
      id: crypto.randomUUID(),
      texto,
      concluida: false,
    };
    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
  };

  const alternarTarefa = (id) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id)
    );
  };

  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;

  // Efeito colateral: sincroniza o título da aba com a quantidade pendente.
  useEffect(() => {
    document.title = `${pendentes} ${pendentes === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
  }, [pendentes]);

  // Desafio: conta o tempo aberto e limpa o intervalo ao desmontar o componente.
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((tempoAtual) => tempoAtual + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatarTempo = (total) => {
    const minutos = Math.floor(total / 60);
    const segundosRestantes = total % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  return (
    <main className="pagina">
      <section className="painel">
        <header className="cabecalho">
          <div>
            <span className="etiqueta">ORGANIZAÇÃO PESSOAL</span>
            <h1>Gerenciador de tarefas</h1>
            <p className="subtitulo">Planeje seu dia, uma tarefa de cada vez.</p>
          </div>
          <div className="cronometro" aria-label={`Página aberta há ${formatarTempo(segundos)}`}>
            <span className="cronometro-icone">◷</span>
            <span><strong>{formatarTempo(segundos)}</strong><small>tempo na página</small></span>
          </div>
        </header>

        <div className="resumo">
          <div className="resumo-numero">{tarefas.length}</div>
          <div><strong>{pendentes} pendentes</strong><span>{tarefas.length - pendentes} concluídas</span></div>
        </div>

        <Formulario onAdicionar={adicionarTarefa} />
        <Lista
          tarefas={tarefas}
          onAlternar={alternarTarefa}
          onRemover={removerTarefa}
        />
        <footer className="rodape">Dados compartilhados pelo componente pai <code>App</code>.</footer>
      </section>
    </main>
  );
}