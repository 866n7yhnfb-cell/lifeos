import React, { useState } from "react";

export default function Premium({ isPremium = false, onActivate }) {
  const [loading, setLoading] = useState(false);

  const activatePremium = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("lifeos_premium", "true");

      if (onActivate) {
        onActivate(true);
      }

      setLoading(false);
    }, 500);
  };

  if (isPremium) {
    return (
      <div className="premium-card premium-active">
        <div className="premium-icon">✦</div>

        <div className="premium-content">
          <div className="premium-badge">PREMIUM</div>

          <h2>LifeOS Premium</h2>

          <p>
            Premium активирован. Все расширенные возможности LifeOS
            доступны.
          </p>

          <div className="premium-features">
            <div>✓ Расширенная статистика</div>
            <div>✓ Дополнительные уровни и XP</div>
            <div>✓ Расширенные задачи</div>
            <div>✓ Продвинутый режим планирования</div>
            <div>✓ Premium-интерфейс</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card">
      <div className="premium-top">
        <div className="premium-icon">✦</div>

        <div>
          <div className="premium-badge">LIFEOS PREMIUM</div>
          <h2>Прокачай свой LifeOS</h2>
        </div>
      </div>

      <p className="premium-description">
        Получи расширенные возможности для учёбы, задач,
        прогресса и личной продуктивности.
      </p>

      <div className="premium-features">
        <div>✓ Расширенная статистика прогресса</div>
        <div>✓ Больше возможностей для задач</div>
        <div>✓ Дополнительная система XP</div>
        <div>✓ Расширенное планирование</div>
        <div>✓ Premium-функции LifeOS</div>
      </div>

      <button
        className="premium-button"
        onClick={activatePremium}
        disabled={loading}
      >
        {loading ? "Активация..." : "Активировать Premium"}
      </button>

      <div className="premium-note">
        Premium активируется локально и сохраняется после
        перезагрузки страницы.
      </div>
    </div>
  );
}
