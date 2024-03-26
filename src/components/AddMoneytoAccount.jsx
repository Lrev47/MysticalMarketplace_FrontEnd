import { useState } from "react";
import { useUpdateMoneyByUserIdMutation } from "../StoreApi";

const AddMoneyToAccount = ({ token, userId, onMoneyAdded, currentBalance }) => {
  const [amount, setAmount] = useState("");

  const [updateUserMoney] = useUpdateMoneyByUserIdMutation();

  const updateAmount = (e) => {
    const moneyNum = parseInt(e.target.value, 10);

    if (!isNaN(moneyNum)) {
      setAmount(moneyNum);
    } else if (e.target.value === "") {
      setAmount("");
    }
  };

  const submitMoneytoAccount = async (moneyNum, userId, currentBalance) => {
    try {
      await updateUserMoney({
        userId,
        moneyNum,
        currentBalance,
      });

      setAmount("");
      onMoneyAdded();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = () => {
    if (amount >= 0) {
      console.log(userId);
      submitMoneytoAccount(amount, userId, currentBalance);
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
