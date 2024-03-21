import { useState } from "react";
import { useUpdateUserMoneyMutation } from "../StoreApi";
import { useParams } from "react-router-dom";

const AddMoneyToAccount = ({ token, userId, onMoneyAdded }) => {
  const [amount, setAmount] = useState("");

  const [updateUserMoney] = useUpdateUserMoneyMutation();

  const updateAmount = (e) => {
    const newAmount = parseInt(e.target.value, 10);

    if (!isNaN(newAmount) && newAmount >= 0) {
      setAmount(newAmount);
    } else if (e.target.value === "") {
      setAmount("");
    }
  };

  const submitMoneytoAccount = async (newAmount, userId) => {
    try {
      await updateUserMoney({
        userId,
        newMoneyAmount: newAmount,
        token,
      }).unwrap();
      console.log("Money Updated");
      setAmount("");
      onMoneyAdded();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = () => {
    if (amount >= 0) {
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
