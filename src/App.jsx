import { useEffect, useState } from "react";

const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Сделать что-нибудь полезное",
    xp: 30,
    completed: false,
  },
  {
    id: 2,
    title: "20 минут обучения",
    xp: 40,
    completed: false,
  },
  {
    id: 3,
    title: "Прогулка",
    xp: 25,
    completed: false,
  },
];

const DEFAULT_QUESTS = [
  {
    id: 1,
    icon: "🌱",
    title: "Доброе дело",
    description:
      "Сделай сегодня что-нибудь хорошее для другого человека.",
    xp: 100,
  },
  {
    id: 2,
    icon: "🚶",
    title: "Исследователь",
    description:
      "Выйди на прогулку и открой новое место.",
    xp: 50,
  },
  {
    id: 3,
    icon: "📚",
    title: "Развитие",
    description:
      "Узнай сегодня что-нибудь новое.",
    xp: 75,
  },
];

const DEFAULT_GOALS = [
  {
    id: 1,
    icon: "📚",
    title: "Выучить английский",
    description:
      "Продолжай заниматься каждый день.",
    progress: 64,
  },
  {
    id: 2,
    icon: "💰",
    title: "Накопить €2 000",
    description:
      "Большие цели начинаются с маленьких шагов.",
    progress: 35,
  },
  {
    id: 3,
    icon: "🏃",
    title: "Стать активнее",
    description:
      "Больше движения каждый день.",
    progress: 48,
  },
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.log("Не удалось загрузить данные:", error);
  }

  return fallback;
}

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const [xp, setXp] = useState(() =>
    loadData("lifeos_xp", 120)
  );

  const [tasks, setTasks] = useState(() =>
    loadData(
      "lifeos_tasks",
      DEFAULT_TASKS
    )
  );

  const [quests, setQuests] = useState(() =>
    loadData(
      "lifeos_quests",
      DEFAULT_QUESTS
    )
  );

  const [goals] = useState(() =>
    loadData(
      "lifeos_goals",
      DEFAULT_GOALS
    )
  );

  const [streak] = useState(() =>
    loadData("lifeos_streak", 7)
  );

  useEffect(() => {
    localStorage.setItem(
      "lifeos_xp",
      JSON.stringify(xp)
    );
  }, [xp]);

  useEffect(() => {
    localStorage.setItem(
      "lifeos_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "lifeos_quests",
      JSON.stringify(quests)
    );
  }, [quests]);

  useEffect(() => {
    localStorage.setItem(
      "lifeos_goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const level = Math.floor(xp / 200) + 1;

  const levelXp = xp % 200;

  const progress = Math.min(
    (levelXp / 200) * 100,
    100
  );

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        if (!task.completed) {
          setXp((currentXp) =>
            currentXp + task.xp
          );
        } else {
          setXp((currentXp) =>
            Math.max(
              0,
              currentXp - task.xp
            )
          );
        }

        return {
          ...task,
          completed: !task.completed,
        };
      })
    );
  }

  function addTask() {
    const title = window.prompt(
      "Название новой задачи:"
    );

    if (!title || !title.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      xp: 30,
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  }

  function completeQuest(id) {
    const quest = quests.find(
      (item) => item.id === id
    );

    if (!quest) {
      return;
    }

    setXp(
      (currentXp) =>
        currentXp + quest.xp
    );

    setQuests((currentQuests) =>
      currentQuests.filter(
        (item) => item.id !== id
      )
    );
  }

  function resetProgress() {
    const confirmed = window.confirm(
      "Сбросить весь прогресс LifeOS?"
    );

    if (!confirmed) {
      return;
    }

    setXp(120);
    setTasks(DEFAULT_TASKS);
    setQuests(DEFAULT_QUESTS);
  }

  return (
    <div className="app">

      <header className="header">
        <div>

          <div className="brand">
            <div className="brand-icon">
              L
            </div>

            <span>
              LifeOS
            </span>
          </div>

          <p className="greeting">
            Добрый вечер 👋
          </p>

          <h1>
            Сделаем сегодняшний
            <br />
            день лучше.
          </h1>

        </div>

        <div className="profile">
          B
        </div>
      </header>

      <section className="level-card">

        <div className="level-row">

          <div>
            <span className="label">
              ТЕКУЩИЙ УРОВЕНЬ
            </span>

            <strong>
              LEVEL {level}
            </strong>
          </div>

          <span className="xp">
            ⭐ {xp} XP
          </span>

        </div>

        <div className="progress">
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="progress-text">
          <span>
            {levelXp} / 200 XP
          </span>

          <span>
            До следующего уровня
          </span>
        </div>

      </section>

      {activeTab === "home" && (
        <main>

          <section className="stats">

            <div className="stat">
              <span>🔥</span>

              <strong>
                {streak}
              </strong>

              <small>
                дней подряд
              </small>
            </div>

            <div className="stat">
              <span>✅</span>

              <strong>
                {completedTasks}
              </strong>

              <small>
                задач выполнено
              </small>
            </div>

            <div className="stat">
              <span>🏆</span>

              <strong>
                4
              </strong>

              <small>
                достижения
              </small>
            </div>

          </section>

          <section className="section">

            <div className="section-header">

              <div>
                <span className="section-label">
                  ПЛАН
                </span>

                <h2>
                  Сегодня
                </h2>
              </div>

              <button
                className="add-button"
                onClick={addTask}
              >
                + Добавить
              </button>

            </div>

            <div className="tasks">

              {tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggle={() =>
                    toggleTask(task.id)
                  }
                />
              ))}

            </div>

          </section>

          <section className="section">

            <div className="section-header">

              <div>
                <span className="section-label">
                  LIFEQUEST
                </span>

                <h2>
                  Квест дня
                </h2>
              </div>

            </div>

            {quests.length > 0 ? (
              <Quest
                quest={quests[0]}
                onComplete={() =>
                  completeQuest(
                    quests[0].id
                  )
                }
              />
            ) : (
              <div className="empty-card">

                <span className="empty-icon">
                  🎉
                </span>

                <strong>
                  Все квесты выполнены!
                </strong>

                <span>
                  Отличная работа.
                </span>

              </div>
            )}

          </section>

        </main>
      )}

      {activeTab === "tasks" && (
        <main>

          <section className="page-title">

            <span className="section-label">
              LIFEOS
            </span>

            <h2>
              Мои задачи
            </h2>

            <button
              className="primary-button"
              onClick={addTask}
            >
              + Новая задача
            </button>

          </section>

          <div className="tasks">

            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onToggle={() =>
                  toggleTask(task.id)
                }
              />
            ))}

          </div>

        </main>
      )}

      {activeTab === "goals" && (
        <main>

          <section className="page-title">

            <span className="section-label">
              PROGRESS
            </span>

            <h2>
              Мои цели
            </h2>

          </section>

          {goals.map((goal) => (
            <Goal
              key={goal.id}
              {...goal}
            />
          ))}

        </main>
      )}

      {activeTab === "quests" && (
        <main>

          <section className="page-title">

            <span className="section-label">
              LIFEQUEST
            </span>

            <h2>
              Квесты
            </h2>

            <p>
              Маленькие действия каждый день
              создают большие изменения.
            </p>

          </section>

          <div className="quest-list">

            {quests.length === 0 ? (
              <div className="empty-card">

                <span className="empty-icon">
                  🏆
                </span>

                <strong>
                  Все квесты выполнены
                </strong>

                <span>
                  Новые квесты появятся позже.
                </span>

              </div>
            ) : (
              quests.map((quest) => (
                <Quest
                  key={quest.id}
                  quest={quest}
                  onComplete={() =>
                    completeQuest(
                      quest.id
                    )
                  }
                />
              ))
            )}

          </div>

        </main>
      )}

      {activeTab === "ai" && (
        <main>

          <section className="page-title">

            <span className="section-label">
              LIFEOS AI
            </span>

            <h2>
              Твой помощник
            </h2>

          </section>

          <div className="ai-card">

            <div className="ai-icon">
              🤖
            </div>

            <h3>
              AI скоро будет здесь
            </h3>

            <p>
              В следующих версиях AI сможет
              помогать тебе планировать день,
              создавать задачи, ставить цели,
              анализировать прогресс и
              предлагать полезные действия.
            </p>

          </div>

          <button
            className="reset-button"
            onClick={resetProgress}
          >
            Сбросить прогресс
          </button>

        </main>
      )}

      <nav className="bottom-nav">

        <NavButton
          icon="⌂"
          label="Главная"
          active={
            activeTab === "home"
          }
          onClick={() =>
            setActiveTab("home")
          }
        />

        <NavButton
          icon="✓"
          label="Задачи"
          active={
            activeTab === "tasks"
          }
          onClick={() =>
            setActiveTab("tasks")
          }
        />

        <NavButton
          icon="🎯"
          label="Цели"
          active={
            activeTab === "goals"
          }
          onClick={() =>
            setActiveTab("goals")
          }
        />

        <NavButton
          icon="✦"
          label="Квесты"
          active={
            activeTab === "quests"
          }
          onClick={() =>
            setActiveTab("quests")
          }
        />

        <NavButton
          icon="🤖"
          label="AI"
          active={
            activeTab === "ai"
          }
          onClick={() =>
            setActiveTab("ai")
          }
        />

      </nav>

    </div>
  );
}

function Task({
  task,
  onToggle,
}) {
  return (
    <div
      className={`task ${
        task.completed
          ? "completed"
          : ""
      }`}
    >

      <button
        className="checkbox"
        onClick={onToggle}
        aria-label="Выполнить задачу"
      >
        {task.completed
          ? "✓"
          : ""}
      </button>

      <div className="task-info">

        <strong>
          {task.title}
        </strong>

        <small>
          Сегодня
        </small>

      </div>

      <span className="task-xp">
        +{task.xp} XP
      </span>

    </div>
  );
}

function Quest({
  quest,
  onComplete,
}) {
  return (
    <div className="quest-card">

      <div className="quest-icon">
        {quest.icon}
      </div>

      <div className="quest-content">

        <span className="quest-label">
          ЕЖЕДНЕВНЫЙ КВЕСТ
        </span>

        <h3>
          {quest.title}
        </h3>

        <p>
          {quest.description}
        </p>

        <div className="quest-footer">

          <span>
            ⭐ +{quest.xp} XP
          </span>

          <button
            onClick={onComplete}
          >
            Выполнить
          </button>

        </div>

      </div>

    </div>
  );
}

function Goal({
  icon,
  title,
  description,
  progress,
}) {
  return (
    <div className="goal-card">

      <div className="goal-icon">
        {icon}
      </div>

      <div className="goal-content">

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

        <div className="goal-progress">

          <div
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="goal-footer">

          <span>
            {progress}%
          </span>

          <span>
            Прогресс
          </span>

        </div>

      </div>

    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      className={`nav-button ${
        active
          ? "active"
          : ""
      }`}
      onClick={onClick}
    >

      <span>
        {icon}
      </span>

      <small>
        {label}
      </small>

    </button>
  );
}

export default App;
