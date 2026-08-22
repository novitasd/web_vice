import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Dropdown.css";

export default function Dropdown({
  label,
  placeholder = "Seleccionar",
  value,
  options,
  getLabel,
  getValue,
  onChange,
  disabled = false,
}) {

  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {

    function handleClickOutside(e){

      if(ref.current && !ref.current.contains(e.target)){

        setOpen(false);

      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const selected = options.find(
    item => getValue(item) === value
  );

  const handleSelect = (item) => {

    onChange({
      target:{
        value:getValue(item)
      }
    });

    setOpen(false);

  };

  return (

    <div
      className={`dropdown ${disabled ? "disabled" : ""}`}
      ref={ref}
    >

      {label && (
        <label>{label}</label>
      )}

      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => !disabled && setOpen(!open)}
      >

        <span>

          {selected
            ? getLabel(selected)
            : placeholder}

        </span>

        <FaChevronDown
          className={open ? "rotate" : ""}
        />

      </button>

      {open && (

        <div className="dropdown-menu">

          {options.map(item => (

            <button
              key={getValue(item)}
              type="button"
              className="dropdown-item"
              onClick={() => handleSelect(item)}
            >

              {getLabel(item)}

            </button>

          ))}

        </div>

      )}

    </div>

  );

}