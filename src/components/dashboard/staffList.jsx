import "../dashboard/dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StaffList = (props) => {
  const limitCount = 8; //顯示幾筆
  const [number, setNumber] = useState(limitCount);
  const [start, setStart] = useState(0); //從哪開始
  const navigate = useNavigate(); //導向
  const [data, setData] = useState([]); //資料變數
  const [searchInput, setSearchInput] = useState(""); //搜尋變數
  const [orderAPI, setOrderAPI] = useState([]); //API變數

  // 會員資料API
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:4107/dashboard/StaffList/"
        );
        setOrderAPI(() => {
          return result.data;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  //   搜尋訂單
  const searchItem = (searchvalue) => {
    setSearchInput(searchvalue);
    if (searchvalue !== "") {
      const filterData = orderAPI.filter((obj) => {
        return Object.values(obj).includes(searchvalue);
      });
      setData(filterData);
    } else {
      setData(orderAPI);
    }
  };

  //   消除搜尋內容
  const handleClear = (e) => {
    e.target.value = "";
    setSearchInput("");
  };

  // 換頁
  const prevPageClick = () => {
    setNumber(number - limitCount > 0 ? number - limitCount : limitCount);
    setStart(start - limitCount > 0 ? start - limitCount : 0);
  };
  const nextPageClick = (data) => {
    setNumber(start + limitCount < data.length ? number + limitCount : number);
    setStart(start + limitCount < data.length ? start + limitCount : start);
  };

  return (
    <div className="dashOrder">
      <div className="orderHead">
        <h3>員工資料</h3>
        <img
          src="/images/search.png"
          alt="img-button"
          className="aside-img-button"
        />
        <input
          className="aside-input"
          type="text"
          placeholder="員工查詢"
          onClick={handleClear}
          onChange={(e) => {
            searchItem(e.target.value);
          }}
        />
      </div>
      <table>
        <thead className="orderThead">
          <tr id="orderTh">
            <th>員工編號</th>
            <th>姓名</th>
            <th>連絡電話</th>
            <th>Email</th>
            <th>疫苗接種</th>
            <th>服務件數</th>
            <th>良民證</th>
            <th>racheck</th>
            <th>photo</th>
          </tr>
          <tr id="orderTh_RWD">
            <th>員工編號</th>
            <th>姓名</th>
            <th>連絡電話</th>
            <th>Email</th>
            <th>疫苗接種</th>
            <th>服務件數</th>
            <th>良民證</th>
            <th>racheck</th>
            <th>photo</th>
          </tr>
        </thead>
        <tbody className="orderTbody">
          {searchInput.length > 1
            ? data
                .slice(start, number)
                .map(
                  ({
                    employeeid,
                    name,
                    phone,
                    email,
                    photo,
                    vaccine,
                    goodid,
                    racheck,
                    cases,
                  }) => {
                    return (
                      <tr
                        key={employeeid}
                        onClick={() => {
                          navigate(`/dashboard/StaffList/${employeeid}`);
                        }}
                      >
                        <td>{employeeid}</td>
                        <td>{name}</td>
                        <td>{phone}</td>
                        <td>{email}</td>
                        <td>{vaccine}</td>
                        <td>{cases}</td>
                        <td>{goodid}</td>
                        <td>{racheck}</td>
                        <td>{photo}</td>
                      </tr>
                    );
                  }
                )
            : orderAPI
                .slice(start, number)
                .map(
                  ({
                    employeeid,
                    name,
                    phone,
                    email,
                    photo,
                    vaccine,
                    goodid,
                    racheck,
                    cases,
                  }) => {
                    return (
                      <tr
                        key={employeeid}
                        onClick={() => {
                          navigate(`/dashboard/StaffList/${employeeid}`);
                        }}
                      >
                        <td>{employeeid}</td>
                        <td>{name}</td>
                        <td>{phone}</td>
                        <td>{email}</td>
                        <td>{vaccine}</td>
                        <td>{cases}</td>
                        <td>{goodid}</td>
                        <td>{racheck}</td>
                        <td>{photo}</td>
                      </tr>
                    );
                  }
                )}
        </tbody>
      </table>
      <div className="orderBtn-group">
        <div className="orderBtn" onClick={() => prevPageClick()}>
          上一頁
        </div>
        <div className="orderBtn" onClick={() => nextPageClick(orderAPI)}>
          下一頁
        </div>
      </div>
    </div>
  );
};
export default StaffList;