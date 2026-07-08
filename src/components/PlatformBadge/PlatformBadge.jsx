import { Monitor, Gamepad2, Smartphone, Dices } from 'lucide-react';
import styles from './PlatformBadge.module.css';

const iconMap = {
  PC: Monitor, PS5: Gamepad2, PS4: Gamepad2, Xbox: Gamepad2,
  NSwitch: Gamepad2, iOS: Smartphone, Android: Smartphone, Board: Dices,
};

const labelMap = {
  PC: 'PC', PS5: 'PS5', PS4: 'PS4', Xbox: 'Xbox',
  NSwitch: 'Switch', iOS: 'iOS', Android: 'Android', Board: '桌游',
};

export default function PlatformBadge({ platform, size = 'sm' }) {
  const Icon = iconMap[platform] || Monitor;
  return (
    <span className={`${styles.badge} ${styles[size]}`}>
      <Icon size={size === 'sm' ? 12 : 14} />
      <span>{labelMap[platform] || platform}</span>
    </span>
  );
}
