import React, { useState } from "react";
import usePasswordGenerator from "./core/passwordGenerator/usePasswordGenerator";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(4);
  const [checkboxData, setCheckboxData] = useState<
    { title: string; state: boolean }[]
  >([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-teal-900 p-8 rounded-xl max-w-lg mx-auto shadow-lg">
      {password && (
        <div className="bg-white flex justify-between items-center p-4 rounded-md mb-5">
          <div className="text-xl font-semibold text-teal-700">{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
            customClass="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none transition"
          />
        </div>
      )}

      <div className="mb-6">
        <label className="block text-white text-lg mb-2">
          Character Length
        </label>
        <div className="flex justify-between">
          <span className="text-white">{length}</span>
        </div>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-teal-300 rounded-lg cursor-pointer"
        />
      </div>

      <div className="space-y-4 mb-6">
        {checkboxData.map((checkbox, index) => (
          <Checkbox
            key={index}
            title={checkbox.title}
            onChange={() => handleCheckboxChange(index)}
            state={checkbox.state}
          />
        ))}
      </div>

      <PasswordStrengthIndicator password={password} />

      {errorMessage && (
        <div className="text-red-500 font-semibold bg-red-100 p-2 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      <Button
        text="Generate Password"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none transition"
      />
    </div>
  );
};

const Button = ({
  onClick,
  text,
  customClass,
}: {
  onClick: () => void;
  text: string;
  customClass: string;
}) => {
  return (
    <button className={`${customClass}`} onClick={onClick}>
      {text}
    </button>
  );
};

const Checkbox = ({
  title,
  state,
  onChange,
}: {
  title: string;
  state: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        onChange={onChange}
        checked={state}
        className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
      />
      <label className="text-white text-lg">{title}</label>
    </div>
  );
};

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const getPasswordStrength = () => {
    const passwordLength = password.length;

    if (passwordLength < 1) {
      return "";
    } else if (passwordLength < 4) {
      return "Very Weak";
    } else if (passwordLength < 8) {
      return "Poor";
    } else if (passwordLength < 12) {
      return "Medium";
    } else if (passwordLength < 16) {
      return "Strong";
    } else {
      return "Very Strong";
    }
  };

  const passwordStrength = getPasswordStrength();

  if (!passwordStrength) return <React.Fragment />;

  let strengthColor = "text-gray-500"; // Default color
  if (passwordStrength === "Very Weak") strengthColor = "text-red-500";
  if (passwordStrength === "Poor") strengthColor = "text-yellow-500";
  if (passwordStrength === "Medium") strengthColor = "text-orange-500";
  if (passwordStrength === "Strong") strengthColor = "text-teal-500";
  if (passwordStrength === "Very Strong") strengthColor = "text-green-500";

  return (
    <div className="w-full flex justify-between pb-3">
      <span className="text-white">Strength:</span>
      <span className={`font-bold ${strengthColor}`}>{passwordStrength}</span>
    </div>
  );
};

export default PasswordGenerator;
