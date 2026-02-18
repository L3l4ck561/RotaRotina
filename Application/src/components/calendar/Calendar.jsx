import { useState, useMemo, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import FloatingMenu from '../layout/FlouatingMenu';
import './Calender.css';
import maisTarefas from '../../assets/enviar.png'

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function Calendar({ setScreen }) {

  //====================================================================================
  // Tarefas, busca e armazenamento
  const [tarefas, setTarefas] = useState(() => {
    try {
      const saved = localStorage.getItem("tarefas");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  //====================================================================================
  // construindo a agenda
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  // Primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1);
  // Último dia do mês
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Dia da semana do primeiro dia
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const daysArray = useMemo(() => {
    const totalCells = 42;
    const arr = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      arr.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      arr.push(day);
    }

    while (arr.length < totalCells) {
      arr.push(null);
    }

    return arr;
  }, [year, month]);

  const goToPreviousMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setDate(new Date());
  };

  //====================================================================================
  // controle das posições das atividades
  const [editingTextId, setEditingTextId] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);

  //busca
  const [highlightTaskId, setHighlightTaskId] = useState(null);
  const buscarTarefa = (tarefa) => {
    // Vai para o mês/ano da tarefa
    setDate(new Date(tarefa.date.year, tarefa.date.month - 1, 1));

    // Fecha o History
    setOpenHistory(false);

    // Destaca a tarefa
    setHighlightTaskId(tarefa.id);

    // Remove destaque depois de 3 segundos
    setTimeout(() => {
      setHighlightTaskId(null);
    }, 3000);
  };
  const [openSearch, setOpenSearch] = useState(false);
  const [searchMonth, setSearchMonth] = useState(month);
  const [searchYear, setSearchYear] = useState(year);

  const abrirSearch = () => {
    setSearchMonth(month);
    setSearchYear(year);
    setOpenSearch(true);
  };

  const fecharSearch = () => {
    setOpenSearch(false);
  };

  const executarBusca = () => {
    setDate(new Date(searchYear, searchMonth, 1));
    setOpenSearch(false);
  };



  const handleDragStart = (evento, id) => {
    setDraggedTaskId(id);
    evento.currentTarget.classList.add('arrastando');

    evento.dataTransfer.setData("text/plain", id);
  };

  const handleDragEnd = (evento) => {
    setDraggedTaskId(null);
    evento.currentTarget.classList.remove('arrastando');
  };

  const handleDrop = (evento, novoStatus) => {
    evento.preventDefault();

    const id = Number(evento.dataTransfer.getData("text/plain"));

    if (!novoStatus) return;

    moverTarefa(id, novoStatus);

  };

  const moverTarefa = (id, novoStatus) => {
    setTarefas((tarefasAtuais) => {
      return tarefasAtuais.map(tarefa => {
        if (tarefa.id === id) {
          return { ...tarefa, date: { day: novoStatus, month: month + 1, year: year } };
        }
        return tarefa;
      });
    });
  };

  //====================================================================================
  // crud das atividades

  const [selectedDay, setSelectedDay] = useState(null);

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const deletarSelecionadas = () => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => !selectedTasks.includes(tarefa.id))
    );
    setSelectedTasks([]);
  };

  const adicionarTarefa = () => {
    if (!selectedDay) return;

    const novoId =
      tarefas.length > 0
        ? Math.max(...tarefas.map(t => t.id)) + 1
        : 1;

    const novaTarefa = {
      id: novoId,
      texto: "Nova tarefa",
      color: "#00e1ff",
      date: {
        day: selectedDay,
        month: month + 1,
        year: year
      }
    };

    setTarefas(prev => [...prev, novaTarefa]);

    // já entra em modo edição
    setEditingTaskId(novoId);
  };

  const getTextColor = (backgroundColor) => {
    const hex = backgroundColor.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Fórmula de luminância perceptiva
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 150 ? "#000000" : "#ffffff";
  };

  // Estado para controlar o History dialog
  const [openHistory, setOpenHistory] = useState(false);

  // Função para abrir o History
  const abrirHistory = () => {
    setOpenHistory(true);
  };

  // Função para fechar
  const fecharHistory = () => {
    setOpenHistory(false);
  };


  return (
    <div className={`calendar`}>
      <header className="calendar-header">
        <button onClick={goToPreviousMonth}>◀</button>
        <div className="month-year">
          <span className='month-title'>{months[month]}</span> {year}
        </div>
        <button onClick={goToNextMonth}>▶</button>
      </header>

      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="days-grid" style={{ flex: 3 }}>
        {daysArray.map((status, index) => (
          <div
            key={`${year}-${month}-${index}`}
            className={`
              kanban-coluna 
              day 
              ${status === null ? 'empty' : ''}
              ${`${year}-${month}-${status}` === dragOverDay ? 'drag-over' : ''}
              ${status === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
                ? 'today'
                : ''
              }
            `}
            onDragOver={(e) => {
              e.preventDefault();
              if (status !== null) {
                setDragOverDay(`${year}-${month}-${status}`);
              }
            }}
            onDrop={(e) => {
              if (status !== null) {
                handleDrop(e, status);
              }
              setDragOverDay(null);
            }}
            onClick={() => {
              if (status !== null) {
                setSelectedDay(status);
              }
            }}
          >
            <div style={{ display: 'flex' }}>
              <h6 style={{ textAlign: 'left', flex: 3 }}>
                {status || ''}
              </h6>
              {tarefas.filter(tarefa => tarefa.date.day === status && tarefa.date.month === month + 1 && tarefa.date.year === year).length > 1 ?
                <div style={{ borderRadius: 5, background: '#9ed5eb', display: 'flex' }}>
                  <img src={maisTarefas} width={25} alt="" style={{ margin: '0 3px' }} />
                  {tarefas.filter(tarefa => tarefa.date.day === status && tarefa.date.month === month + 1 && tarefa.date.year === year).length || ''}
                  +
                </div>
                : ''}

            </div>

            <div className="kanban-coluna-cartoes">
              {tarefas
                .filter(tarefa => tarefa.date.day === status && tarefa.date.month === month + 1 && tarefa.date.year === year)
                .map(tarefa => (

                  <div
                    key={tarefa.id}
                    className="kanban-cartao"

                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, tarefa.id)}
                    onDragEnd={handleDragEnd}
                    style={{
                      marginBottom: 10,
                      backgroundColor: tarefa.color,
                      color: getTextColor(tarefa.color),
                      textShadow: getTextColor(tarefa.color) === "#ffffff"
                        ? "0 0 4px rgba(0,0,0,0.6)"
                        : "0 0 4px rgba(255,255,255,0.6)"
                    }}
                  >
                    {tarefa.texto}
                  </div>

                ))}
            </div>
          </div>
        ))}
      </div>

      {/* telas de controle modal */}

      <Dialog
        open={!!selectedDay}
        onClose={() => setSelectedDay(null)}
      >
        <DialogTitle>
          Dia {selectedDay} de {months[month]} de {year}
        </DialogTitle>

        <DialogContent>

          {tarefas
            .filter(tarefa => tarefa.date.day === selectedDay && tarefa.date.month === month + 1 && tarefa.date.year === year)
            .map(tarefa => (
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 10 }} key={tarefa.id}>

                <label className="container" style={{ flex: 0, width: '100%' }}>
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(tarefa.id)}
                    onChange={() => {
                      setSelectedTasks((prev) =>
                        prev.includes(tarefa.id)
                          ? prev.filter((id) => id !== tarefa.id)
                          : [...prev, tarefa.id]
                      );
                    }}
                  />
                  <div className="checkmark"></div>
                </label>

                <div className="kanban-cartao" style={{ flex: 3, width: '100%' }}>
                  {editingTextId === tarefa.id ? (
                    <input
                      className='inp-edit-at'
                      type="text"
                      value={tarefa.texto}
                      autoFocus
                      onChange={(e) => {
                        const novoTexto = e.target.value;
                        setTarefas((tarefasAtuais) =>
                          tarefasAtuais.map((t) =>
                            t.id === tarefa.id ? { ...t, texto: novoTexto } : t
                          )
                        );
                      }}
                      onBlur={() => setEditingTextId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditingTextId(null);
                        }
                      }}
                    />
                  ) : (
                    <div onClick={() => setEditingTextId(tarefa.id)} style={{ width: '100%' }}>
                      {tarefa.texto}
                    </div>
                  )}
                </div>
                <div style={{ margin: '0 2px' }} />
                <input
                  type="color"
                  value={tarefa.color}
                  autoFocus
                  className="color-picker"
                  onChange={(e) => {
                    const novaCor = e.target.value;

                    setTarefas((tarefasAtuais) =>
                      tarefasAtuais.map((t) =>
                        t.id === tarefa.id
                          ? { ...t, color: novaCor }
                          : t
                      )
                    );
                  }}
                />

              </div>



            ))}

        </DialogContent>

        <DialogActions>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>

            <Button color="error" onClick={deletarSelecionadas}>
              Deletar
            </Button>

            <label className="switch">
              <input
                type="checkbox"
                checked={
                  tarefas.filter(t =>
                    t.date.day === selectedDay &&
                    t.date.month === month + 1 &&
                    t.date.year === year
                  ).every(t => selectedTasks.includes(t.id))
                }
                onChange={(e) => {
                  const tarefasDoDia = tarefas.filter(t =>
                    t.date.day === selectedDay &&
                    t.date.month === month + 1 &&
                    t.date.year === year
                  );

                  if (e.target.checked) {
                    setSelectedTasks(tarefasDoDia.map(t => t.id));
                  } else {
                    setSelectedTasks([]);
                  }
                }}
              />
              <span className="slider"></span>
            </label>
          </div>

          <Button onClick={() => setSelectedDay(null)}>
            Fechar
          </Button>
          <Button variant="contained" onClick={adicionarTarefa}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openHistory} onClose={fecharHistory} maxWidth="sm" fullWidth>
        <DialogTitle>Histórico de Tarefas</DialogTitle>
        <DialogContent>
          {tarefas.length === 0 ? (
            <p>Nenhuma tarefa cadastrada.</p>
          ) : (

            tarefas.map((tarefa) => (
              <div
                key={tarefa.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div onClick={() => buscarTarefa(tarefa)} className="w-8 h-8 bg-white  flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-[#3b82f6] transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  value={tarefa.texto}
                  onChange={(e) => {
                    const novoTexto = e.target.value;
                    setTarefas((prev) =>
                      prev.map((t) =>
                        t.id === tarefa.id ? { ...t, texto: novoTexto } : t
                      )
                    );
                  }}
                  style={{ flex: 3 }}
                />

                {/* Dia */}
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={tarefa.date.day}
                  onChange={(e) => {
                    const novoDia = Number(e.target.value);
                    setTarefas((prev) =>
                      prev.map((t) =>
                        t.id === tarefa.id
                          ? { ...t, date: { ...t.date, day: novoDia } }
                          : t
                      )
                    );
                  }}
                  style={{ width: 50 }}
                />

                {/* Mês */}
                <select
                  value={tarefa.date.month}
                  onChange={(e) => {
                    const novoMes = Number(e.target.value);
                    setTarefas((prev) =>
                      prev.map((t) =>
                        t.id === tarefa.id
                          ? { ...t, date: { ...t.date, month: novoMes } }
                          : t
                      )
                    );
                  }}
                >
                  {months.map((m, i) => (
                    <option key={i} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Ano */}
                <input
                  type="number"
                  value={tarefa.date.year}
                  onChange={(e) => {
                    const novoAno = Number(e.target.value);
                    setTarefas((prev) =>
                      prev.map((t) =>
                        t.id === tarefa.id
                          ? { ...t, date: { ...t.date, year: novoAno } }
                          : t
                      )
                    );
                  }}
                  style={{ width: 70 }}
                />
              </div>
            ))
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={fecharHistory}>Fechar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSearch} onClose={fecharSearch}>
        <DialogTitle>Navegar pelo Calendário</DialogTitle>

        <DialogContent style={{ display: 'flex', gap: 15, marginTop: 10 }}>

          {/* Mês */}
          <select
            value={searchMonth}
            onChange={(e) => setSearchMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>

          {/* Ano */}
          <input
            type="number"
            value={searchYear}
            onChange={(e) => setSearchYear(Number(e.target.value))}
            style={{ width: 100 }}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={fecharSearch}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={executarBusca}>
            Buscar
          </Button>
        </DialogActions>
      </Dialog>




      <FloatingMenu
        onPrimaryAction={goToToday}
        onSearch={abrirSearch}
        onHistory={abrirHistory}
        onHome={() => setScreen("weekly")}
      />
    </div>
  );
}
