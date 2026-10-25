import React from 'react';
import { ArrowRight, Clock3, TrainFront } from 'lucide-react';
import { formatDuration, formatMoney } from '../utils/format';

export default function TrainCard({ train, onSelect }) {
  return (
    <article className="train-card">
      <div className="train-card-top">
        <div className="train-title">
          <span className="train-icon"><TrainFront size={19} /></span>
          <div>
            <h3>{train.name}</h3>
            <p>#{train.number} <span className="separator">·</span> {train.type}</p>
          </div>
        </div>
        <span className="demo-tag">Sample data</span>
      </div>
      <div className="journey-line">
        <div className="station-time">
          <strong>{train.departure}</strong>
          <span>{train.from}</span>
        </div>
        <div className="journey-duration">
          <span>{formatDuration(train.duration)}</span>
          <div className="line"><span /></div>
          <small>Direct journey</small>
        </div>
        <div className="station-time align-right">
          <strong>{train.arrival}</strong>
          <span>{train.to}</span>
        </div>
      </div>
      <div className="train-card-bottom">
        <div>
          <span className="muted-label">Starting from</span>
          <strong className="fare">{formatMoney(train.fare)}<small> / person</small></strong>
        </div>
        <div className="class-list">{train.classes.map(item => <span key={item}>{item}</span>)}</div>
        <button className="button button-outline" onClick={() => onSelect(train)}>View details <ArrowRight size={16} /></button>
      </div>
    </article>
  );
}
