import React from "react";
import ProgressIcon from "../../components/book/ProgressIcon";
import ProgressIconactive from "../../components/book/ProgressIconactive";
import ProgressLine from "../../components/book/ProgressLine";
import Step2Area from "../../components/book/Step2Area";
import "./book_style.css";

const Book2 = () => {
  return (
    <>
      <div className="bottomArea">
        <div className="progressBar">
          <ProgressIcon text="選擇服務" class="bi bi-hand-index-thumb" />
          <ProgressLine />
          <ProgressIconactive text="選擇時段" class="bi bi-clock" />
          <ProgressLine />
          <ProgressIcon text="填寫資料" class="bi bi-file-earmark-text" />
          <ProgressLine />
          <ProgressIcon text="付款確認" class="bi bi-credit-card-2-front" />
          <ProgressLine />
          <ProgressIcon text="預約完成" class="bi bi-clipboard-check" />
        </div>
        <Step2Area />
      </div>
    </>
  );
};

export default Book2;
