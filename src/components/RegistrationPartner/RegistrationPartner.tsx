import React, { ChangeEvent, FC, useState } from "react";

import css from "../Registration/Registration.module.css";

const RegistrationPartner: FC<{
  setPartnerName :  React.Dispatch<React.SetStateAction<string>>;
  setShowNameSecondPlayer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setPartnerName, setShowNameSecondPlayer }) => {
    const [form, setForm] = useState({ name: "" });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const registration = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setPartnerName(form.name);
        setForm({ name: "" });
        setShowNameSecondPlayer(true);
    };
    const exit = () => {
        window.location.href = "/";
    };

    return (
        <div className={css.main}>
            <h2>Registrieren</h2>
            <div className={css.formBox}>
                <div className={css.borderForm}>
                    <form action="" className={css.form}>
                        <label>
              Geben Sie Ihren Name ein
                            <input
                                type="text"
                                name={"name"}
                                value={form.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={registration} className={css.buttonRegistration}>
              Registrieren
                        </button>
                    </form>
                    <button onClick={exit} className={css.buttonExit}>
                        {" "}
            Beenden
                    </button>
                </div>
            </div>
        </div>
    );
};

export { RegistrationPartner };
