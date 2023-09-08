import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";

const Step4Area = ({ formData, setFormData }) => {
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const time = ["08:00", "13:00", "18:00"];
  const [price, setPrice] = useState("");

  function checkPay() {
    const cardNumber = "0000-1111-2222-3333";
    const monthYear = "10/23";
    const securityCode = "357";
    let nextBtn = document.querySelector(".bookbtns>a:nth-child(2)");
    console.log(nextBtn);
    let cardInput = document.querySelectorAll(
      ".creaditCard input[type='text']"
    );
    console.log(cardInput);
    let card = ``;
    for (let i = 0; i < 4; i++) {
      card += cardInput[i].value + "-";
    }
    card = card.substring(0, 19);
    if (
      card === cardNumber &&
      cardInput[4].value === monthYear &&
      cardInput[5].value === securityCode
    ) {
      setTimeout(() => {
        alert("付款成功！");
        window.location.replace("/book/book5");
      }, 2000);
    }else{
      alert('付款失敗!');
    }
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4107/book/price?week=${formData.weeks}`)
      .then((res) => {
        setPrice(res.data[0].price);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  });
  return (
    <>
      <form
        action=""
        method="post"
        className="container d-flex  justify-content-center align-items-center flex-column"
      >
        <div className="d-flex container justify-content-center align-items-center book-step1">
          <div className="left book4-left">
            <table id="book4-order">
              <tr>
                <th colspan="2">訂單內容</th>
              </tr>
              <tr>
                <td className="fw-bold">清潔頻率</td>
                <td>每週一次</td>
              </tr>
              <tr>
                <td className="fw-bold">清潔週數</td>
                <td>{formData.weeks} 週</td>
              </tr>
              <tr>
                <td className="fw-bold">服務時間</td>
                <td>
                  {weeks[formData.week]}　{time[formData.time]}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">開始日期</td>
                <td>{formData.date}</td>
              </tr>
              <tr>
                <td className="fw-bold">訂單金額</td>
                <td>{price} 元</td>
              </tr>
            </table>
          </div>
          <div className="right">
            <div className="book4-pay">
              <div className="payMethod">
                <label htmlFor="pay-method">付款方式</label>
                <select name="payMethod" id="pay-method">
                  <option value="payInFull">信用卡一次付清</option>
                </select>
              </div>
              <div className="d-flex justify-content-center my-3">
                <div className="creaditCard d-flex flex-column align-items-start ">
                  <label htmlFor="creaditCard-number" className="mt-2">
                    信用卡號碼
                  </label>
                  <div className="mt-2">
                    <input
                      id="creaditCard-number"
                      className="ms-0"
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                    -
                    <input
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                    -
                    <input
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                    -
                    <input
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                  </div>
                  <div className="mt-4 mb-2">
                    <label htmlFor="deadline">有效月 / 年</label>
                    <input
                      id="deadline"
                      type="text"
                      placeholder="MM/YY"
                      pattern="(0[1-9]|1[0-2])/(2[3-9]|3[0-9])"
                      required
                    />
                    <label htmlFor="securityCode">背面末三碼</label>
                    <input
                      id="securityCode"
                      type="text"
                      placeholder="***"
                      pattern="[0-9]{3}"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="book4-comment">
            <input type="checkbox" name="isAgree" id="agree" required />
            我已閱讀 <u>非清潔服務範圍</u>、<u>取消或更改服務政策</u>、
            <u>服務條款</u> 及 <u>隱私權政策</u>
          </div>
        </div>
        {/* next="/book/book5" */}
        <Button pre="/book/book3" onClick={checkPay} />
      </form>
    </>
  );
};

export default Step4Area;
