import { useEffect, useState } from "react";

const initialTasks = [
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
  {
    id: 4,
    title: "Навести порядок",
    xp: 20,
    completed: false,
  },
];

const quests = [
  {
    icon: "⚡",
    title: "Энергия",
    text: "Сделай сегодня что-нибудь для себя",
  },
  {
    icon: "🧠",
    title: "Развитие",
    text: "Узнай что-нибудь новое",
  },
  {
    icon: "🎯",
    title: "Фокус",
    text: "Заверши одну важную задачу",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("lifeos_tasks");
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [showQuests, setShowQuests] = useState(false);

  useEffect(() => {
    localStorage.setItem("lifeos_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter((task) => task.completed).length;
  const totalXP = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.xp, 0);

  const maxXP = tasks.reduce((sum, task) => sum + task.xp, 0);
  const progress = maxXP ? Math.round((totalXP / maxXP) * 100) : 0;

  const level = Math.floor(totalXP / 100) + 1;
  const currentLevelXP = totalXP % 100;

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function resetDay() {
    setTasks(initialTasks);
  }

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGlow} />

      <main style={styles.container}>
        {/* HEADER */}
        <header style={styles.header}>
          <div>
            <div style={styles.logo}>
              <span style={styles.logoMark}>L</span>
              <span>LifeOS</span>
            </div>

            <p style={styles.subtitle}>
              Твой день. Твои правила.
            </p>
          </div>

          <div style={styles.levelBadge}>
            <span>LVL</span>
            <strong>{level}</strong>
          </div>
        </header>

        {/* HERO */}
        <section style={styles.hero}>
          <div>
            <p style={styles.smallLabel}>СЕГОДНЯ</p>

            <h1 style={styles.title}>
              Стань лучше
              <br />
              <span>на 1%.</span>
            </h1>

            <p style={styles.heroText}>
              Маленькие действия каждый день
              превращаются в большие изменения.
            </p>
          </div>

          <div style={styles.progressCircle}>
            <div style={styles.progressInner}>
              <strong>{progress}%</strong>
              <span>готово</span>
            </div>
          </div>
        </section>

        {/* XP CARD */}
        <section style={styles.xpCard}>
          <div style={styles.xpTop}>
            <div>
              <span style={styles.cardLabel}>ТВОЙ ПРОГРЕСС</span>
              <div style={styles.xpNumber}>
                {totalXP} <small>XP</small>
              </div>
            </div>

            <div style={styles.xpLevel}>
              <span>Уровень</span>
              <strong>{level}</strong>
            </div>
          </div>

          <div style={styles.bar}>
            <div
              style={{
                ...styles.barFill,
                width: `${currentLevelXP}%`,
              }}
            />
          </div>

          <div style={styles.xpBottom}>
            <span>{currentLevelXP}/100 XP</span>
            <span>до следующего уровня</span>
          </div>
        </section>

        {/* TASKS */}
        <section>
          <div style={styles.sectionHeader}>
            <div>
              <p style={styles.smallLabel}>MISSION</p>
              <h2 style={styles.sectionTitle}>Задачи дня</h2>
            </div>

            <span style={styles.counter}>
              {completed}/{tasks.length}
            </span>
          </div>

          <div style={styles.tasks}>
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  ...styles.task,
                  ...(task.completed ? styles.taskDone : {}),
                }}
              >
                <div
                  style={{
                    ...styles.checkbox,
                    ...(task.completed
                      ? styles.checkboxDone
                      : {}),
                  }}
                >
                  {task.completed ? "✓" : ""}
                </div>

                <div style={styles.taskContent}>
                  <span
                    style={{
                      ...styles.taskTitle,
                      ...(task.completed
                        ? styles.taskTitleDone
                        : {}),
                    }}
                  >
                    {task.title}
                  </span>

                  <span style={styles.taskXP}>
                    +{task.xp} XP
                  </span>
                </div>

                <span style={styles.arrow}>›</span>
              </button>
            ))}
          </div>
        </section>

        {/* QUEST BUTTON */}
        <button
          onClick={() => setShowQuests(!showQuests)}
          style={styles.questButton}
        >
          <span style={styles.questIcon}>✦</span>

          <div>
            <strong>Ежедневные квесты</strong>
            <span>Открой задания на сегодня</span>
          </div>

          <span style={styles.arrow}>
            {showQuests ? "⌃" : "›"}
          </span>
        </button>

        {/* QUESTS */}
        {showQuests && (
          <section style={styles.questList}>
            {quests.map((quest) => (
              <div key={quest.title} style={styles.questCard}>
                <div style={styles.questEmoji}>
                  {quest.icon}
                </div>

                <div>
                  <strong>{quest.title}</strong>
                  <p>{quest.text}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* RESET */}
        <button onClick={resetDay} style={styles.resetButton}>
          Сбросить день
        </button>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerLogo}>L</div>

          <div>
            <strong>LifeOS</strong>
            <p>Build your better life.</p>
          </div>

          <span style={styles.version}>v1.0</span>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 50% -10%, #321015 0%, #0b0b0d 38%, #050506 100%)",
    color: "#ffffff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
    overflowX: "hidden",
  },

  backgroundGlow: {
    position: "fixed",
    top: "-180px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "400px",
    height: "400px",
    background: "rgba(255, 35, 55, 0.10)",
    filter: "blur(100px)",
    borderRadius: "50%",
    pointerEvents: "none",
  },

  container: {
    width: "100%",
    maxWidth: "680px",
    margin: "0 auto",
    padding: "28px 20px 50px",
    boxSizing: "border-box",
    position: "relative",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "45px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "25px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  logoMark: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #ff3045, #a90019)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    boxShadow: "0 8px 30px rgba(255, 30, 55, .25)",
  },

  subtitle: {
    margin: "7px 0 0 48px",
    color: "#77777e",
    fontSize: "13px",
  },

  levelBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "54px",
    height: "54px",
    border: "1px solid #29292e",
    background: "#111114",
    borderRadius: "16px",
  },

  levelBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "54px",
    height: "54px",
    border: "1px solid #29292e",
    background: "#111114",
    borderRadius: "16px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "28px",
  },

  smallLabel: {
    color: "#ff4052",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    margin: "0 0 9px",
  },

  title: {
    fontSize: "42px",
    lineHeight: "0.98",
    letterSpacing: "-2px",
    margin: "0",
    fontWeight: "850",
  },

  title span: {
    color: "#ff3045",
  },

  heroText: {
    color: "#77777e",
    lineHeight: "1.5",
    fontSize: "14px",
    maxWidth: "330px",
    marginTop: "18px",
  },

  progressCircle: {
    flexShrink: 0,
    width: "108px",
    height: "108px",
    borderRadius: "50%",
    background:
      "conic-gradient(#ff3045 0deg, #ff3045 180deg, #25252a 180deg, #25252a 360deg)",
    padding: "5px",
    boxSizing: "border-box",
  },

  progressInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#0b0b0d",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  xpCard: {
    background:
      "linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025))",
    border: "1px solid #29292e",
    borderRadius: "22px",
    padding: "22px",
    marginBottom: "38px",
    boxShadow: "0 20px 60px rgba(0,0,0,.25)",
  },

  xpTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardLabel: {
    color: "#77777e",
    fontSize: "10px",
    letterSpacing: "1.5px",
    fontWeight: "700",
  },

  xpNumber: {
    fontSize: "34px",
    fontWeight: "850",
    marginTop: "5px",
  },

  xpNumberSmall: {
    fontSize: "13px",
    color: "#ff3045",
  },

  xpLevel: {
    textAlign: "right",
    color: "#77777e",
    fontSize: "11px",
  },

  xpLevelStrong: {
    display: "block",
    color: "#fff",
    fontSize: "25px",
    marginTop: "2px",
  },

  bar: {
    height: "7px",
    background: "#25252a",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "20px",
  },

  barFill: {
    height: "100%",
    background:
      "linear-gradient(90deg, #ff3045, #ff6675)",
    borderRadius: "20px",
    transition: "width .4s ease",
  },

  xpBottom: {
    display: "flex",
    justifyContent: "space-between",
    color: "#66666d",
    fontSize: "11px",
    marginTop: "9px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    marginBottom: "15px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "25px",
    letterSpacing: "-.7px",
  },

  counter: {
    background: "#17171b",
    border: "1px solid #29292e",
    color: "#aaaab0",
    padding: "8px 12px",
    borderRadius: "12px",
    fontSize: "12px",
  },

  tasks: {
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },

  task: {
    width: "100%",
    border: "1px solid #25252a",
    background: "#101013",
    color: "#fff",
    borderRadius: "17px",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    textAlign: "left",
    cursor: "pointer",
  },

  taskDone: {
    background: "#160d0f",
    borderColor: "#4a2026",
  },

  checkbox: {
    width: "27px",
    height: "27px",
    borderRadius: "9px",
    border: "1px solid #414148",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
  },

  checkboxDone: {
    background: "#ff3045",
    borderColor: "#ff3045",
  },

  taskContent: {
    flex: 1,
    minWidth: 0,
  },

  taskTitle: {
    display: "block",
    fontSize: "14px",
    fontWeight: "650",
  },

  taskTitleDone: {
    color: "#77777e",
    textDecoration: "line-through",
  },

  taskXP: {
    display: "block",
    color: "#ff4052",
    fontSize: "11px",
    marginTop: "5px",
    fontWeight: "700",
  },

  arrow: {
    color: "#55555c",
    fontSize: "24px",
  },

  questButton: {
    width: "100%",
    marginTop: "25px",
    padding: "17px",
    borderRadius: "18px",
    border: "1px solid #452027",
    background:
      "linear-gradient(135deg, rgba(255,48,69,.14), rgba(255,48,69,.04))",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textAlign: "left",
    cursor: "pointer",
  },

  questIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "11px",
    background: "#ff3045",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },

  questCard: {
    display: "flex",
    gap: "13px",
    alignItems: "center",
    padding: "16px",
    background: "#111114",
    border: "1px solid #25252a",
    borderRadius: "16px",
    marginTop: "8px",
  },

  questEmoji: {
    fontSize: "23px",
  },

  questCardP: {
    margin: "5px 0 0",
    color: "#77777e",
    fontSize: "12px",
  },

  resetButton: {
    marginTop: "25px",
    width: "100%",
    padding: "13px",
    border: "none",
    background: "transparent",
    color: "#55555c",
    fontSize: "12px",
    cursor: "pointer",
  },

  footer: {
    borderTop: "1px solid #202025",
    marginTop: "35px",
    paddingTop: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#77777e",
  },

  footerLogo: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#ff3045",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "900",
  },

  footerLogo: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#ff3045",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "900",
  },

  version: {
    marginLeft: "auto",
    fontSize: "11px",
    color: "#44444a",
  },
};
