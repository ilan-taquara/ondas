import React from 'react';
import Head from '../../hooks/Head/Head';
import Title from '../../components/Title/Title';
import styles from './Certificate.module.css';
import InputRadio from '../../components/InputRadio/InputRadio';
import useForm from '../../hooks/useForm/useForm';
import Button from '../../components/Button/Button';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import modelo from '../../assets/modelo.jpg';

const Certificate = () => {
  const month = useForm();
  const year = useForm();
  const [data, setData] = React.useState();
  const [hideButtons, setHideButtons] = React.useState(false);
  function excelSerialDateToJSDate(serial) {
    let excelEpoch = new Date(1900, 0, 1);
    let adjustment = serial > 59 ? serial - 2 : serial - 1;
    let date = new Date(
      excelEpoch.getTime() + adjustment * 24 * 60 * 60 * 1000,
    );
    return date;
  }

  function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      'https://ondas-backend-javascript-production.up.railway.app/certificate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month, year }),
      },
    );
    const dataCertificate = await response.json();
    const monthValue = month.value.slice(0, 3).toUpperCase();
    const yearValue = year.value.slice(2, 5);
    const monthYear = monthValue + yearValue;
    // console.log(monthYear);
    const filtered = dataCertificate.filter((data) => {
      console.log(data);
      let serialDates = [data[5], data[9], data[11], data[14]];
      let formattedDates = serialDates.map((serial) =>
        formatDate(excelSerialDateToJSDate(serial)),
      );

      console.log(formattedDates);

      if (typeof data[4] === 'string') {
        return data[4];
      }
    });
    setData(filtered);
  };

  const handleGeneratePDF = (certificateId) => {
    const certificateElement = document.getElementById(certificateId);
    setHideButtons(true);

    setTimeout(() => {
      html2canvas(certificateElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('portrait');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`certificado_${certificateId}.pdf`);
        setHideButtons(false);
      });
    }, 100);
  };

  return (
    <>
      <Head
        title="Ondas - Ilan Church | Certificado"
        description="Essa é a página de Certificado."
      />
      <Title>Certificado</Title>
      <form className={`${styles.form} container`} onSubmit={handleSubmit}>
        <p>Selecione o mês: </p>
        <InputRadio
          options={[
            { id: 1, name: 'Janeiro' },
            { id: 2, name: 'Fevereiro' },
            { id: 3, name: 'Março' },
            { id: 4, name: 'Abril' },
            { id: 5, name: 'Maio' },
            { id: 6, name: 'Junho' },
            { id: 7, name: 'Julho' },
            { id: 8, name: 'Agosto' },
            { id: 9, name: 'Setembro' },
            { id: 10, name: 'Outubro' },
            { id: 11, name: 'Novembro' },
            { id: 12, name: 'Dezembro' },
          ]}
          {...month}
        />
        <p>Selecione o ano: </p>
        <InputRadio
          options={[
            { id: 2020, name: '2020' },
            { id: 2021, name: '2021' },
            { id: 2022, name: '2022' },
            { id: 2023, name: '2023' },
            { id: 2024, name: '2024' },
            { id: 2025, name: '2025' },
            { id: 2026, name: '2026' },
            { id: 2027, name: '2027' },
            { id: 2028, name: '2028' },
            { id: 2029, name: '2029' },
            { id: 2030, name: '2030' },
          ]}
          {...year}
        />
        <Button>Gerar certificados</Button>
      </form>
      {data && (
        <div className="container">
          {data.map((certificate, index) => (
            <div
              key={index}
              id={`certificate-${certificate[1]}`}
              className={styles.certificate}
            >
              <h1>Nome: {certificate[1]}</h1>
              <p>Certificado de participação</p>
              <p>{`Mês: ${month.value}`}</p>
              <p>{`Ano: ${year.value}`}</p>
              {!hideButtons && (
                <button
                  className={styles.btn}
                  onClick={() =>
                    handleGeneratePDF(`certificate-${certificate[1]}`)
                  }
                >
                  Baixar Certificado de {certificate[1]}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Certificate;
