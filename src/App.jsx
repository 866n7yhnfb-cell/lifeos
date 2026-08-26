import { useState } from "react";
import "./index.css";
import Premium from "./Premium.jsx";

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

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [started, setStarted] = useState(false);

  // Сохраняем Premium после перезагрузки страницы
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem("lifeos_premium") === "true";
  });

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const earnedXP = tasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + task.xp, 0);

  const totalXP = 1000;
  const currentXP = 720 + earnedXP;
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
          <a href="#stats">Статистика</a>
        </nav>

        <button className="profile-button">
          <span>●</span>
        </button>
      </header>

      <main>
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
                <span className="online">● ONLINE</span>
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
                  <span>{currentXP} / 1000 XP</span>
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
                  <strong>🔥 5 DAYS</strong>
                </div>

                <div>
                  <span>RANK</span>
                  <strong>#042</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="quests">
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
                onClick={() => toggleTask(task.id)}
              >
                <div className="task-left">
                  <div className="task-icon">
                    {task.icon}
                  </div>

                  <div className="task-info">
                    <strong>{task.title}</strong>

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
                    {task.completed ? "✓" : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          className="section stats-section"
          id="stats"
        >
          <div className="section-label">
            02 / PROGRESS
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

        {/* PREMIUM */}
        <section
          className="section"
          id="premium"
        >
          <div className="section-label">
            03 / PREMIUM
          </div>

          <Premium
            isPremium={isPremium}
            onActivate={setIsPremium}
          />
        </section>

        {/* CTA */}
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
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

              setStarted(true);
            }}
          >
            НАЧАТЬ СЕЙЧАС <span>→</span>
          </button>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          <div className="logo-mark small">L</div>
          LIFEOS
        </div>

        <span>BUILD YOURSELF.</span>

        <span>© 2026 LIFEOS</span>
      </footer>
    </div>
  );
}

export default App;
