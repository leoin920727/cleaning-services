import "./dashboard.css";
import data from "./fakeList.json"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UndoneOrder = (props) => {
  const limitCount = 8;//顯示幾筆
  const [number, setNumber] = useState(limitCount);
  const [start, setStart] = useState(0);//從哪開始
  const navigate = useNavigate()//導向
  // 目標頁數
  // const pages = (Math.ceil(data.length / number))
  // 起始頁數
  // const [page, setPage] = useState(1);

  const handleOrderStatus = (orderStatus) => {
    if (orderStatus === "1") {
      return "新訂單"
    } else if (orderStatus === "99") {
      return "已完成"
    } return "未完成"
  }

  const undone = data.filter(data => data.orderStatus === "0");//篩選未完成訂單

  const prevPageClick = () => {
    setNumber(number - limitCount > 0 ? number - limitCount : limitCount)
    setStart(start - limitCount > 0 ? start - limitCount : 0)
  }
  const nextPageClick = () => {
    setNumber(start + limitCount < undone.length ? number + limitCount : number)
    setStart(start + limitCount < undone.length ? start + limitCount : start)
  }
  return (
    <div className="dashOrder">
      <h3>管理訂單</h3>
      <table>
        <thead className="orderThead">
          <tr id="orderTh">
            <th>訂單編號</th>
            <th>會員編號</th>
            <th>訂單日期</th>
            <th>清潔頻率</th>
            <th>清潔週數</th>
            <th>訂單金額</th>
            <th>訂單狀態</th>
          </tr>
          <tr id="orderTh_RWD">
            <th>No.</th>
            <th>ID</th>
            <th>Date</th>
            <th>WoT</th>
            <th>WoA</th>
            <th>Price</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody className="orderTbody">
          {undone.slice(start, number).map(({
            orderNumber,
            memberId,
            orderDate,
            weekOfTimes,
            weekOfAmount,
            price,
            orderStatus }) => {
            return (
              <tr key={memberId} onClick={() => {
                navigate(`/dashboard/AdminOrder/${memberId}`)
              }}>
                <td>{orderNumber}</td>
                <td>{memberId}</td>
                <td>{orderDate}</td>
                <td>{weekOfTimes}次&frasl;週</td>
                <td>{weekOfAmount}週</td>
                <td>{price}</td>
                <td>{handleOrderStatus(orderStatus)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="orderBtn-group">
        <div className="orderBtn"
          onClick={prevPageClick}>
          上一頁
        </div>
        <div className="orderBtn"
          onClick={nextPageClick}>
          下一頁
        </div>
      </div>
    </div>
  );
};
export default UndoneOrder;