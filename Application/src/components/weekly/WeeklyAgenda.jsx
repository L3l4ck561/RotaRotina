import { useState, useEffect, useMemo } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import FloatingMenu from '../layout/FlouatingMenu';
import './WeeklyAgenda.css';

const daysOfWeekShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const START_HOUR = 7;
const END_HOUR = 22;
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

export default function Weekly({ setScreen }) {

    //====================================================================================
    // Tarefas, busca e armazenamento
    const [tarefas, setTarefas] = useState(() => {
        try {
            const saved = localStorage.getItem('tarefas');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    //====================================================================================

    const [currentMonday, setCurrentMonday] = useState(() => {
        const today = new Date();
        const day = today.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);
        return monday;
    });

    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(currentMonday);
            d.setDate(currentMonday.getDate() + i);
            return {
                date: d,
                day: d.getDate(),
                month: d.getMonth() + 1,
                year: d.getFullYear(),
                weekday: daysOfWeekShort[d.getDay()],
                isToday: d.toDateString() === new Date().toDateString(),
            };
        });
    }, [currentMonday]);

    const goPrevWeek = () => {
        const prev = new Date(currentMonday);
        prev.setDate(prev.getDate() - 7);
        setCurrentMonday(prev);
    };

    const goNextWeek = () => {
        const next = new Date(currentMonday);
        next.setDate(next.getDate() + 7);
        setCurrentMonday(next);
    };

    const goThisWeek = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);
        setCurrentMonday(monday);
    };

    //====================================================================================
    // Diálogos
    const [taskDialog, setTaskDialog] = useState(null);
    const [openHistory, setOpenHistory] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchYear, setSearchYear] = useState(new Date().getFullYear());
    const [searchMonth, setSearchMonth] = useState(new Date().getMonth() + 1);
    const [searchDay, setSearchDay] = useState(new Date().getDate());

    const handleAddClick = (dayIndex, hour) => {
        setTaskDialog({
            mode: 'add',
            dayIndex,
            hour,
            texto: '',
            color: '#00bfff',
            startTime: `${hour.toString().padStart(2, '0')}:00`,
            endTime: `${Math.min(END_HOUR + 1, hour + 1).toString().padStart(2, '0')}:00`,
        });
    };

    const handleEditClick = (task) => {
        setTaskDialog({
            mode: 'edit',
            task,
            texto: task.texto || '',
            color: task.color || '#00bfff',
            startTime: task.startTime || '07:00',
            endTime: task.endTime || '08:00',
        });
    };

    const handleDialogChange = (field, value) => {
        setTaskDialog((prev) => ({ ...prev, [field]: value }));
    };

    const calcularDuracaoMinutos = (start, end) => {
        if (!start || !end) return 60;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        return (eh * 60 + em) - (sh * 60 + sm);
    };

    const validarHorarios = (start, end) => {
        if (!start || !end) return false;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        const startMin = sh * 60 + sm;
        const endMin = eh * 60 + em;
        return endMin > startMin + 14;
    };

    const confirmarTarefa = () => {
        if (!taskDialog || !taskDialog.texto?.trim()) {
            taskDialog.texto = 'Nova tarefa'
        }

        if (!validarHorarios(taskDialog.startTime, taskDialog.endTime)) {
            alert('O horário final deve ser pelo menos 15 minutos após o início.');
            return;
        }

        const novoId = tarefas.length ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1;

        const tarefaAtualizada = {
            id: taskDialog.mode === 'edit' ? taskDialog.task.id : novoId,
            texto: taskDialog.texto.trim(),
            color: taskDialog.color,
            startTime: taskDialog.startTime,
            endTime: taskDialog.endTime,
            date:
                taskDialog.mode === 'edit'
                    ? taskDialog.task.date
                    : {
                        day: weekDays[taskDialog.dayIndex].day,
                        month: weekDays[taskDialog.dayIndex].month,
                        year: weekDays[taskDialog.dayIndex].year,
                    },
        };

        setTarefas((prev) =>
            taskDialog.mode === 'edit'
                ? prev.map((t) => (t.id === tarefaAtualizada.id ? tarefaAtualizada : t))
                : [...prev, tarefaAtualizada]
        );

        setTaskDialog(null);
    };

    const deletarTarefa = (id) => {
        setTarefas((prev) => prev.filter((t) => t.id !== id));
        setTaskDialog(null);
    };

    const tarefasPorDia = useMemo(() => {
        const map = {};
        weekDays.forEach((day) => {
            const key = `${day.year}-${day.month}-${day.day}`;
            map[key] = tarefas
                .filter(
                    (t) =>
                        t.date?.year === day.year &&
                        t.date?.month === day.month &&
                        t.date?.day === day.day
                )
                .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
        });
        return map;
    }, [tarefas, weekDays]);

    const getTextColor = (bg = '#ffffff') => {
        const hex = bg.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) || 0;
        const g = parseInt(hex.substring(2, 4), 16) || 0;
        const b = parseInt(hex.substring(4, 6), 16) || 0;
        return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#000' : '#fff';
    };

    // Busca / Navegação semanal
    const abrirSearch = () => {
        const today = new Date();
        setSearchYear(today.getFullYear());
        setSearchMonth(today.getMonth() + 1);
        setSearchDay(today.getDate());
        setOpenSearch(true);
    };

    const fecharSearch = () => setOpenSearch(false);

    const executarBusca = () => {
        const targetDate = new Date(searchYear, searchMonth - 1, searchDay);
        const dayOfWeek = targetDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(targetDate);
        monday.setDate(targetDate.getDate() + diff);
        setCurrentMonday(monday);
        setOpenSearch(false);
    };

    // History
    const abrirHistory = () => setOpenHistory(true);
    const fecharHistory = () => setOpenHistory(false);

    const buscarTarefa = (tarefa) => {
        if (!tarefa?.date) return;
        const targetDate = new Date(tarefa.date.year, tarefa.date.month - 1, tarefa.date.day);
        const dayOfWeek = targetDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(targetDate);
        monday.setDate(targetDate.getDate() + diff);
        setCurrentMonday(monday);
        setOpenHistory(false);
    };

    return (
        <div className={`weekly-agenda`}>

            <header className="week-header">
                <button onClick={goPrevWeek}>◀</button>
                <div className="week-title">
                    {weekDays[0].day} <span className='month-title'>{months[weekDays[0].month - 1]} — </span>
                    {weekDays[6].day} <span className='month-title'>{months[weekDays[6].month - 1]}</span> {weekDays[0].year}
                </div>
                <button onClick={goNextWeek}>▶</button>
            </header>

            <div className="grid-container">
                <div className="time-col header"></div>

                {weekDays.map((day, idx) => (
                    <div key={idx} className={`day-header ${day.isToday ? 'today' : ''}`}>
                        <div className="weekday">{day.weekday}</div>
                        <div className="daynum">{day.day}</div>
                    </div>
                ))}

                {HOURS.map((hour) => (
                    <>
                        <div className="time-col">{hour}:00</div>

                        {weekDays.map((day, dayIdx) => {
                            const dayKey = `${day.year}-${day.month}-${day.day}`;
                            const dayTasks = tarefasPorDia[dayKey] || [];

                            return (
                                <div
                                    key={`${dayIdx}-${hour}`}
                                    className="hour-cell"
                                    style={{ position: 'relative' }}
                                >
                                    {dayTasks
                                        .filter((t) => {
                                            if (!t.startTime) return false;
                                            const [h] = t.startTime.split(':').map(Number);
                                            return h === hour;
                                        })
                                        .map((t) => {
                                            const durationMin = calcularDuracaoMinutos(t.startTime, t.endTime);
                                            const [_, startMin] = t.startTime.split(':').map(Number);
                                            const topPercent = (startMin / 60) * 100;

                                            return (
                                                <div
                                                    key={t.id}
                                                    className="task-block"
                                                    style={{
                                                        position: 'absolute',
                                                        top: `${topPercent}%`,
                                                        height: `${(durationMin / 60) * 100}%`,
                                                        left: '4px',
                                                        right: '4px',
                                                        backgroundColor: t.color,
                                                        color: getTextColor(t.color),
                                                        borderRadius: '6px',
                                                        padding: '6px 8px',
                                                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                                        cursor: 'pointer',
                                                        overflow: 'hidden',
                                                        zIndex: 10,
                                                    }}
                                                    onClick={() => handleEditClick(t)}
                                                >
                                                    <div className="task-title">{t.texto}</div>
                                                    <div className="task-time">
                                                        {t.startTime} – {t.endTime}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    <div
                                        className="add-zone"
                                        onClick={() => handleAddClick(dayIdx, hour)}
                                    />
                                </div>
                            );
                        })}
                    </>
                ))}
            </div>

            {/* Diálogo de tarefa */}
            <Dialog open={!!taskDialog} onClose={() => setTaskDialog(null)}>
                <DialogTitle>{taskDialog?.mode === 'add' ? 'Nova Tarefa' : 'Editar Tarefa'}</DialogTitle>
                <DialogContent>
                    {/* ... conteúdo do diálogo de tarefa igual ao anterior ... */}
                    {taskDialog && (
                        <>
                            <p style={{ margin: '8px 0' }}>
                                {taskDialog.mode === 'add'
                                    ? `${weekDays[taskDialog.dayIndex]?.weekday || ''}, ${weekDays[taskDialog.dayIndex]?.day || ''}/${weekDays[taskDialog.dayIndex]?.month || ''} às ${taskDialog.hour}:00`
                                    : `Dia ${taskDialog.task?.date?.day || '?'} / ${taskDialog.task?.date?.month || '?'} / ${taskDialog.task?.date?.year || '?'}`}
                            </p>

                            <input
                                autoFocus
                                type="text"
                                className='inp-edit-at'
                                placeholder="Descrição da tarefa"
                                value={taskDialog.texto}
                                onChange={(e) => handleDialogChange('texto', e.target.value)}
                                style={{ width: '100%', padding: '8px', margin: '12px 0' }}
                            />

                            <div style={{ display: 'flex', gap: '16px', margin: '12px 0', flexWrap: 'wrap' }}>
                                <label>
                                    Início:
                                    <input
                                        type="time"
                                        value={taskDialog.startTime}
                                        onChange={(e) => handleDialogChange('startTime', e.target.value)}
                                    />
                                </label>
                                <label>
                                    Fim:
                                    <input
                                        type="time"
                                        value={taskDialog.endTime}
                                        onChange={(e) => handleDialogChange('endTime', e.target.value)}
                                    />
                                </label>
                            </div>

                            <input
                                type="color"
                                value={taskDialog.color}
                                className="color-picker"
                                onChange={(e) => handleDialogChange('color', e.target.value)}
                                style={{ width: '60px', height: '40px', marginTop: '12px' }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    {taskDialog?.mode === 'edit' && (
                        <Button color="error" onClick={() => deletarTarefa(taskDialog.task.id)}>
                            Deletar
                        </Button>
                    )}
                    <Button onClick={() => setTaskDialog(null)}>Cancelar</Button>
                    <Button variant="contained" onClick={confirmarTarefa}>
                        {taskDialog?.mode === 'add' ? 'Criar' : 'Salvar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo History */}
            <Dialog open={openHistory} onClose={fecharHistory} maxWidth="md" fullWidth>
                <DialogTitle>Histórico de Tarefas</DialogTitle>
                <DialogContent>
                    {tarefas.length === 0 ? (
                        <p>Nenhuma tarefa cadastrada.</p>
                    ) : (
                        tarefas.filter(item =>
                            item.startTime && item.endTime
                        ).map((tarefa) => (
                            <div
                                key={tarefa.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 10,
                                    padding: '8px',
                                    borderBottom: '1px solid #eee',
                                }}
                            >
                                <div
                                    onClick={() => buscarTarefa(tarefa)}
                                    className="w-8 h-8 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-100 cursor-pointer"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-400 hover:text-[#3b82f6] transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

                                {/* Horário de início */}
                                <input
                                    type="time"
                                    value={tarefa.startTime}
                                    onChange={(e) => {
                                        const novoStartTime = e.target.value;
                                        setTarefas((prev) =>
                                            prev.map((t) =>
                                                t.id === tarefa.id ? { ...t, startTime: novoStartTime } : t
                                            )
                                        );
                                    }}
                                    style={{ width: 100 }}
                                />

                                {/* Horário de fim */}
                                <input
                                    type="time"
                                    value={tarefa.endTime}
                                    onChange={(e) => {
                                        const novoEndTime = e.target.value;
                                        setTarefas((prev) =>
                                            prev.map((t) =>
                                                t.id === tarefa.id ? { ...t, endTime: novoEndTime } : t
                                            )
                                        );
                                    }}
                                    style={{ width: 100 }}
                                />
                            </div>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={fecharHistory}>Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo Search / Navegação */}
            <Dialog open={openSearch} onClose={fecharSearch}>
                <DialogTitle>Navegar pela Semana</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 10 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <label>
                            Dia:
                            <input
                                type="number"
                                min="1"
                                max="31"
                                value={searchDay}
                                onChange={(e) => setSearchDay(Number(e.target.value))}
                                style={{ width: 80, padding: '6px' }}
                            />
                        </label>
                        <label>
                            Mês:
                            <select
                                value={searchMonth}
                                onChange={(e) => setSearchMonth(Number(e.target.value))}
                                style={{ padding: '6px' }}
                            >
                                {months.map((m, i) => (
                                    <option key={i} value={i + 1}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Ano:
                            <input
                                type="number"
                                value={searchYear}
                                onChange={(e) => setSearchYear(Number(e.target.value))}
                                style={{ width: 100, padding: '6px' }}
                            />
                        </label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fecharSearch}>Cancelar</Button>
                    <Button variant="contained" onClick={executarBusca}>
                        Ir para data
                    </Button>
                </DialogActions>
            </Dialog>

            <FloatingMenu
                onPrimaryAction={goThisWeek}
                onSearch={abrirSearch}
                onHistory={abrirHistory}
                onHome={() => setScreen("calendar")}
            />
        </div>
    );
}