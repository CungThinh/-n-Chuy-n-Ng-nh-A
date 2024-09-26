import React from 'react';
import './styles.css';

const ProgressSteps = () => {
  return (
    <ul className="ftl-step">
      <li className="ftl-active">
        <div className="ftl-circle-first">1</div>
        <span>Chọn chuyến bay</span>
      </li>
      <li>
        <div className="ftl-arrow-active"></div>
        <div className="ftl-circle">2</div>
        <span>Đặt chỗ</span>
      </li>
      <li>
        <div className="ftl-arrow"></div>
        <div className="ftl-circle">3</div>
        <span>Thanh toán</span>
      </li>
    </ul>
  );
};

export default ProgressSteps;