import React, { useRef } from "react";

interface OTPCheckProps {
  code: string[];
  setCode: (code: string[]) => void;
}

const OTPCheck = ({
  code,
  setCode,
}: {
  code: string[];
  setCode: (code: string[]) => void;
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newValues = [...code];
    newValues[index] = val.slice(-1);
    setCode(newValues);

    // Auto-focus next
    if (val && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Backspace logic
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <>
      <div className={`my-5`}>
        <div className="grid grid-cols-4 gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              maxLength={1}
              className="input-field text-center text-2xl font-semibold"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={digit}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default OTPCheck;
