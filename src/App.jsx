import { useEffect, useState } from "react";
import "./index.css";

const initialTasks = [
  {
    id: 1,
    icon: "⚡",
    title: "Сделать что-нибудь полезное",
    xp: 30,
    completed: false,
  },
  {
    id: 2,
    icon: "📚",
    title: "20 минут обучения",
    xp: 40,
    completed: false,
  },
  {
    id: 3,
    icon: "🚶",
    title: "Прогулка",
    xp: 25,
    completed: false,
  },
];

const STORAGE_KEY = "lifeos-progress-v2";

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        tasks: initialTasks,
        started: false,
        bossDefeated: false,
        bossDate: getToday(),
      };
    }

    const parsed = JSON.parse(saved);

    const savedDate = parsed.bossDate;
    const today = getToday();

    // Новый день — новый Босс.
    const bossDefeated =
      savedDate === today ? Boolean(parsed.bossDefeated) : false;

    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : initialTasks,
      started: Boolean(parsed.started),
      bossDefeated,
      bossDate: today,
    };
  } catch {
    return {
      tasks: initialTasks,
      started: false,
      bossDefeated: false,
      bossDate: getToday(),
    };
  }
};

function App() {
  const initialState = getInitialState();

  const [tasks, setTasks] = useState(initialState.tasks);
  const [started, setStarted] = useState(initialState.started);
  const [bossDefeated, setBossDefeated] = useState(
    initialState.bossDefeated
  );

  /*
   * Сохраняем всё состояние приложения.
   *
   * После reload:
   * - выполненные квесты останутся;
   * - XP останется;
   * - статус LIFEOS останется;
   * - победа над Боссом останется до следующего дня.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          tasks,
          started,
          bossDefeated,
          bossDate: getToday(),
        })
      );
    } catch {
      // Если localStorage недоступен — приложение всё равно продолжает работать.
    }
  }, [tasks, started, bossDefeated]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const earnedTaskXP = tasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + task.xp, 0);

  const bossXP = bossDefeated ? 100 : 0;

  const totalXP = 1000;

  const currentXP = 720 + earnedTaskXP + bossXP;

  const progress = Math.min(
    (currentXP / totalXP) * 100,
    100
  );

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const defeatBoss = () => {
    if (bossDefeated) return;

    setBossDefeated(true);
  };

  const startLifeOS = () => {
    setStarted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <header className="navbar">
        <div className="logo">
          <div className="logo-mark">L</div>

          <span>
            LIFE<span>OS</span>
          </span>
        </div>

        <nav>
          <a href="#home">Главная</a>
          <a href="#quests">Квесты</a>
          <a href="#boss">Босс дня</a>
          <a href="#stats">Статистика</a>
        </nav>

        <button className="profile-button">
          <span>●</span>
        </button>
      </header>

      <main>
        {/* =========================
            HERO
        ========================== */}

        <section className="hero" id="home">
          <div className="hero-content">
            <div className="badge">
              <span className="red-dot"></span>
              YOUR LIFE. YOUR GAME.
            </div>

            <h1>
              Прокачай свою
              <br />
              <span>жизнь как игру.</span>
            </h1>

            <p className="hero-text">
              LifeOS превращает твои цели, привычки и задачи
              в систему прокачки персонажа.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => setStarted(true)}
              >
                {started
                  ? "LIFEOS АКТИВЕН"
                  : "НАЧАТЬ ПРОКАЧКУ"}

                <span>→</span>
              </button>

              <a
                className="secondary-button"
                href="#quests"
              >
                Посмотреть квесты
              </a>
            </div>

            <div className="mini-stats">
              <div>
                <strong>7</strong>
                <span>УРОВЕНЬ</span>
              </div>

              <div className="mini-line"></div>

              <div>
                <strong>{currentXP}</strong>
                <span>XP</span>
              </div>

              <div className="mini-line"></div>

              <div>
                <strong>{completedTasks}</strong>
                <span>КВЕСТА</span>
              </div>
            </div>
          </div>

          <div className="hero-card-wrapper">
            <div className="hero-card">
              <div className="card-top">
                <span>PLAYER PROFILE</span>

                <span className="online">
                  ● ONLINE
                </span>
              </div>

              <div className="avatar">
                <div className="avatar-inner">L</div>
              </div>

              <h2>PLAYER</h2>

              <p className="player-title">
                LEVEL 07 • BUILDER
              </p>

              <div className="xp-section">
                <div className="xp-label">
                  <span>EXPERIENCE</span>

                  <span>
                    {currentXP} / 1000 XP
                  </span>
                </div>

                <div className="xp-bar">
                  <div
                    className="xp-progress"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="card-bottom">
                <div>
                  <span>STREAK</span>

                  <strong>
                    🔥 5 DAYS
                  </strong>
                </div>

                <div>
                  <span>RANK</span>

                  <strong>#042</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            QUESTS
        ========================== */}

        <section
          className="section"
          id="quests"
        >
          <div className="section-heading">
            <div>
              <div className="section-label">
                01 / DAILY SYSTEM
              </div>

              <h2>Квесты на сегодня</h2>
            </div>

            <div className="quest-counter">
              {completedTasks}/{tasks.length}
            </div>
          </div>

          <div className="tasks">
            {tasks.map((task) => (
              <button
                key={task.id}
                className={`task ${
                  task.completed ? "completed" : ""
                }`}
                onClick={() =>
                  toggleTask(task.id)
                }
              >
                <div className="task-left">
                  <div className="task-icon">
                    {task.icon}
                  </div>

                  <div className="task-info">
                    <strong>
                      {task.title}
                    </strong>

                    <span>
                      {task.completed
                        ? "QUEST COMPLETED"
                        : "DAILY QUEST"}
                    </span>
                  </div>
                </div>

                <div className="task-right">
                  <span className="task-xp">
                    +{task.xp} XP
                  </span>

                  <div className="check">
                    {task.completed
                      ? "✓"
                      : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* =========================
            BOSS OF THE DAY
        ========================== */}

        <section
          className="section"
          id="boss"
        >
          <div className="section-heading">
            <div>
              <div className="section-label">
                02 / DAILY BOSS
              </div>

              <h2>Босс дня</h2>
            </div>

            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: bossDefeated
                  ? "#4ade80"
                  : "#ff5b5b",
              }}
            >
              {bossDefeated
                ? "DEFEATED"
                : "ACTIVE"}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(255,70,70,0.10), rgba(20,22,28,0.95))",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background:
                  "rgba(255,70,70,0.12)",
                filter: "blur(50px)",
                top: "-70px",
                right: "-50px",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                }}
              >
                ⚔️
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                {bossDefeated
                  ? "BOSS DEFEATED"
                  : "BOSS OF THE DAY"}
              </h3>

              <p
                style={{
                  margin: "0 0 24px",
                  maxWidth: "600px",
                  fontSize: "17px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.68)",
                }}
              >
                {bossDefeated
                  ? "Ты сделал главное дело дня. Завтра появится новый Босс."
                  : "Заверши самое важное дело, которое ты откладываешь сегодня."}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "5px",
                    }}
                  >
                    REWARD
                  </span>

                  <strong
                    style={{
                      fontSize: "26px",
                    }}
                  >
                    +100 XP
                  </strong>
                </div>

                <button
                  className="primary-button"
                  onClick={defeatBoss}
                  disabled={bossDefeated}
                  style={{
                    opacity: bossDefeated
                      ? 0.55
                      : 1,
                    cursor: bossDefeated
                      ? "default"
                      : "pointer",
                  }}
                >
                  {bossDefeated
                    ? "БОСС ПОБЕЖДЁН ✓"
                    : "ПОБЕДИТЬ БОССА"}

                  <span>
                    {bossDefeated
                      ? "✓"
                      : "→"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            STATS
        ========================== */}

        <section
          className="section stats-section"
          id="stats"
        >
          <div className="section-label">
            03 / PROGRESS
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>LEVEL</span>

              <strong>07</strong>

              <small>KEEP GOING</small>
            </div>

            <div className="stat-card">
              <span>TOTAL XP</span>

              <strong>{currentXP}</strong>

              <small>EXPERIENCE</small>
            </div>

            <div className="stat-card">
              <span>STREAK</span>

              <strong>5</strong>

              <small>DAYS ACTIVE</small>
            </div>

            <div className="stat-card red-card">
              <span>NEXT LEVEL</span>

              <strong>
                {Math.max(
                  1000 - currentXP,
                  0
                )}
              </strong>

              <small>XP REMAINING</small>
            </div>
          </div>
        </section>

        {/* =========================
            CTA
        ========================== */}

        <section className="cta">
          <div className="cta-glow"></div>

          <div className="section-label">
            04 / LIFEOS
          </div>

          <h2>
            Твоя жизнь.
            <br />
            <span>Твои правила.</span>
          </h2>

          <p>
            Каждый день — новый уровень.
            <br />
            Каждый выбор — шаг вперёд.
          </p>

          <button
            className="primary-button"
            onClick={startLifeOS}
          >
            НАЧАТЬ СЕЙЧАС <span>→</span>
          </button>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          <div className="logo-mark small">
            L
          </div>

          LIFEOS
        </div>

        <span>BUILD YOURSELF.</span>

        <span>© 2026 LIFEOS</span>
      </footer>
    </div>
  );
}

export default App;
