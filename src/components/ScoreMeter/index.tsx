import React from 'react';

import styles from "./ScoreMeter.module.css";
import { percentToDegree } from '../../common/utils';

type ScoreMeterProps = {
  percent: number;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({percent = 0}) => {

  const rotateValue = percentToDegree(percent)

  return (
    <div className={styles.meterContainer}>
      <div className={styles.meterImg}>
        <img src="meter.png" alt="" />
      </div>
      <div className={styles.dialImg}>
        <img src="dial.png" alt="" />
      </div>
      <div className={styles.pointerImg} style={{transform: `rotate(${rotateValue}deg)`}}>
        <img src="pointer.png" alt="" />
      </div>
      <div className={styles.percent}>
        <h2>{percent}%</h2>
      </div>
    </div>
  );
}

export default ScoreMeter