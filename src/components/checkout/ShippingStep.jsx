import "./ShippingStep.css";

import departamentosData from "../../data/ubigeo/departamentos.json";
import provinciasData from "../../data/ubigeo/provincias.json";
import distritosData from "../../data/ubigeo/distritos.json";

import Dropdown from "../../components/UI/Dropdown/Dropdown";

function ShippingStep({
  shippingData,
  setShippingData,
  onNext,
  onBack,
}) {
  const departamentos = departamentosData.ubigeo_departamentos;
  const provincias = provinciasData.ubigeo_provincias;
  const distritos = distritosData.ubigeo_distritos;

  // Encontrar departamento seleccionado
  const selectedDepartment = departamentos.find(
    (item) => item.departamento === shippingData.department
  );

  // Provincias correspondientes al departamento
  const filteredProvinces = selectedDepartment
    ? provincias.filter(
        (item) => item.departamento_id === selectedDepartment.id
      )
    : [];

  // Encontrar provincia seleccionada
  const selectedProvince = filteredProvinces.find(
    (item) => item.provincia === shippingData.province
  );

  // Distritos correspondientes a la provincia
  const filteredDistricts = selectedProvince
    ? distritos.filter(
        (item) => item.provincia_id === selectedProvince.id
      )
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;

    setShippingData((prev) => ({
      ...prev,
      department,
      province: "",
      district: "",
      ubigeo: "",
    }));
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;

    setShippingData((prev) => ({
      ...prev,
      province,
      district: "",
      ubigeo: "",
    }));
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;

    const district = filteredDistricts.find(
      (item) => item.distrito === districtName
    );

    setShippingData((prev) => ({
      ...prev,
      district: districtName,
      ubigeo: district?.ubigeo || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Dirección:", shippingData);

    onNext();
  };

  return (
    <section className="shipping-step">

      <div className="shipping-heading">

        <button
          type="button"
          className="shipping-back"
          onClick={onBack}
        >
          ← Volver
        </button>

        <h1>Dirección de entrega</h1>

        <p>
          Añade los datos necesarios para realizar tu envío.
        </p>

      </div>

      <form
        className="shipping-form"
        onSubmit={handleSubmit}
      >

        {/* NOMBRE / APELLIDO */}

        <div className="shipping-row">

          <div className="shipping-field">

            <label htmlFor="name">
              Nombre <span>*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={shippingData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="shipping-field">

            <label htmlFor="lastName">
              Apellido <span>*</span>
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={shippingData.lastName}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        {/* TELÉFONO */}

        <div className="shipping-field">

          <label htmlFor="phone">
            Teléfono <span>*</span>
          </label>

          <div className="phone-field">

            <div className="phone-prefix">
              🇵🇪 +51
            </div>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="999 999 999"
              value={shippingData.phone}
              onChange={handleChange}
              required
            />

          </div>

          <small>
            Necesario para coordinar correctamente la entrega.
          </small>

        </div>

        {/* DEPARTAMENTO */}

        <div className="shipping-field">


           <Dropdown
    label="Departamento"
    placeholder="Selecciona un departamento"
    value={shippingData.department}
    options={departamentos}
    getLabel={(item) => item.departamento}
    getValue={(item) => item.departamento}
    onChange={handleDepartmentChange}
/>

        </div>

        {/* PROVINCIA / DISTRITO */}

        <div className="shipping-row">

          {/* PROVINCIA */}

          <div className="shipping-field">



           <Dropdown
  label="Provincia"
  placeholder="Selecciona una provincia"
  value={shippingData.province}
  options={filteredProvinces}
  getLabel={(item) => item.provincia}
  getValue={(item) => item.provincia}
  onChange={handleProvinceChange}
  disabled={!selectedDepartment}
/>

          </div>

          {/* DISTRITO */}

          <div className="shipping-field">


          <Dropdown
  label="Distrito"
  placeholder="Selecciona un distrito"
  value={shippingData.district}
  options={filteredDistricts}
  getLabel={(item) => item.distrito}
  getValue={(item) => item.distrito}
  onChange={handleDistrictChange}
  disabled={!selectedProvince}
/>

          </div>

        </div>

        {/* DIRECCIÓN */}

        <div className="shipping-field">

          <label htmlFor="address">
            Dirección <span>*</span>
          </label>

          <input
            id="address"
            name="address"
            type="text"
            placeholder="Av., Jr., Calle, número, urbanización..."
            value={shippingData.address}
            onChange={handleChange}
            required
          />

        </div>

        {/* REFERENCIA */}

        <div className="shipping-field">

          <label htmlFor="reference">
            Referencia
          </label>

          <input
            id="reference"
            name="reference"
            type="text"
            placeholder="Ej. Frente al parque, casa de puerta negra..."
            value={shippingData.reference}
            onChange={handleChange}
          />

        </div>

        <div className="shipping-actions">

          <button
            type="submit"
            className="shipping-submit"
          >
            Confirmar dirección de entrega
          </button>

        </div>

      </form>

    </section>
  );
}

export default ShippingStep;