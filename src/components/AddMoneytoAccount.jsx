import { useState } from "react";
import { useUpdateUserMoneyMutation } from "../StoreApi";

const AddMoneyToAccount = ({ token, userId, onMoneyAdded }) => {
  const [amount, setAmount] = useState("");

  const [updateUserMoney] = useUpdateUserMoneyMutation();

  const updateAmount = (e) => {
    const moneyNum = parseInt(e.target.value, 10);

    if (!isNaN(moneyNum)) {
      setAmount(moneyNum);
    } else if (e.target.value === "") {
      setAmount("");
    }
  };

  const submitMoneytoAccount = async (moneyNum, userId, token) => {
    try {
      await updateUserMoney({
        userId,
        moneyNum: moneyNum,
        token,
      });

      setAmount("");
      onMoneyAdded();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = () => {
    if (amount >= 0) {
      console.log(amount, userId);
      submitMoneytoAccount(amount, userId);
    } else {
      console.log("no negative value");
    }
  };

  return (
    <div className="AddMoneyToAccountContainer">
      <h3>Add Money to your Account</h3>
      <div className="MoneyInputContainer">
        <input
          className="MoneyInput"
          type="Number"
          value={amount}
          onChange={updateAmount}
        ></input>
      </div>
      <button className="AddMoneyButton" onClick={onSubmit}>
        Add Money
      </button>
    </div>
  );
};

export default AddMoneyToAccount;
