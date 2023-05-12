import React from "react";
import Input from "../../components/UIElements/Input";
import Button from "../../components/UIElements/Button";

const PasswordChange = (props) => {
  const { mode } = props;
  return (
    <div className="mx-auto">
      {mode == "change" && (
        <>
          <Input
            inputId="password"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="password"
            inputLabel="Stara šifra "
            onChange=""
          />
          <Input
            inputId="password"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="password"
            inputLabel="Stara šifra, ponovljena "
            onChange=""
          />
        </>
      )}
      <Input
        inputId="password"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C] mr-6"
        inputType="password"
        inputLabel="Nova šifra "
        onChange=""
      />
      <Button
        btnStyle="mt-5 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Izmeni"
        type="submit"
      />
    </div>
  );
};

export default PasswordChange;
