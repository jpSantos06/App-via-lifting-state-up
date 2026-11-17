# App — Lifting State Up

Aplicação React de gerenciamento de tarefas desenvolvida para praticar **compartilhamento de estado entre componentes**, comunicação por props e efeitos colaterais com `useEffect`.

## Como executar

É necessário ter Node.js instalado.

```bash
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite. Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```text
src/
├── components/
│   ├── Formulario.jsx
│   └── Lista.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## O que foi desenvolvido

### Parte 1 — Manipulação e validação de dados

O estado principal da lista de tarefas foi elevado para o componente pai `App`. O pai compartilha os dados e as funções com os componentes filhos por meio de props. O formulário recebe a função `onAdicionar`, enquanto a lista recebe o array `tarefas` e as funções para concluir e remover itens.

O formulário também valida o campo: não permite adicionar uma tarefa vazia e apresenta uma mensagem de erro.

### Parte 2 — Mini projeto: Gerenciador de Tarefas

- **App:** mantém o estado da lista de tarefas.
- **Formulario:** recebe `onAdicionar` por props e comunica ao pai o evento de adicionar.
- **Lista:** recebe o array de tarefas por props e exibe cada item.
- É possível adicionar, concluir e remover tarefas.
- Um `useEffect` atualiza o título da aba conforme a quantidade de tarefas pendentes, por exemplo: `3 tarefas pendentes`.

### Parte 3 — Timer com cleanup

Um segundo `useEffect` utiliza `setInterval` para contar os segundos em que a página está aberta. O efeito possui array de dependências vazio, então o intervalo é criado na montagem do componente. No retorno do efeito, `clearInterval` encerra o timer quando o componente é desmontado, evitando que o intervalo continue executando sem necessidade.

### Parte 4 — Reflexão

**O que acontece se omitirmos o array de dependências do useEffect?**

Se omitirmos completamente o segundo argumento, o efeito será executado após **cada renderização** do componente. Se o efeito atualizar um estado que provoca outra renderização, isso pode gerar um ciclo de atualizações repetidas. Por isso, devemos declarar as dependências que o efeito utiliza. Um array vazio (`[]`) executa o efeito na montagem (e a limpeza na desmontagem); um array com valores executa novamente quando algum deles muda.

**Como funciona o fluxo de dados no lifting state up?**

No lifting state up, o estado compartilhado é movido para o ancestral comum mais próximo dos componentes que precisam dele. Assim, o componente pai é a fonte única da verdade e passa os dados para os filhos por props (fluxo de dados para baixo). Para alterar esses dados, o pai também passa funções por props; o filho chama essas funções quando ocorre uma interação (eventos para cima). Dessa forma, os irmãos compartilham informações indiretamente por meio do pai, sem manter cópias independentes do mesmo estado.

## Tecnologias

- React 18
- Vite
- JavaScript (JSX)
- CSS
