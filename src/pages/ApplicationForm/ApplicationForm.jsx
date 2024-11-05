import React from 'react';
import styles from './ApplicationForm.module.css';
import Title from '../../components/Title/Title';
import Head from '../../hooks/Head/Head';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm/useForm';
import InputRadio from '../../components/InputRadio/InputRadio';
import excelService from '../../services/excelService';
import DataSent from '../../components/DataSent/DataSent';
import { ThemeContext } from '../../hooks/Theme/Theme';

const ApplicationForm = () => {
  const name = useForm();
  const telephone = useForm();
  const childs = useForm();
  const enrollmentOrReplacement = useForm();
  const preferTime = useForm();
  const enrollmentBy = useForm();
  const voluntary = useForm();
  const [form, setForm] = React.useState(null);

  const inputNameRef = React.useRef();
  const inputTelephoneRef = React.useRef();
  const inputChildsRef = React.useRef();
  const inputEnrollmentOrReplacementRef = React.useRef();
  const inputPreferTimeRef = React.useRef();
  const inputEnrollmentByRef = React.useRef();
  const inputVoluntaryRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name.validate() &&
      telephone.validate() &&
      childs.validate() &&
      enrollmentOrReplacement.validate() &&
      preferTime.validate() &&
      enrollmentBy.validate() &&
      voluntary.validate()
    ) {
      excelService({
        name: name.value,
        telephone: telephone.value,
        childs: childs.value,
        enrollmentOrReplacement: enrollmentOrReplacement.value,
        preferTime: preferTime.value,
        enrollmentBy: enrollmentBy.value,
        voluntary: voluntary.value,
      }).addToExcel();
      console.log(
        name.value,
        telephone.value,
        childs.value,
        enrollmentOrReplacement.value,
        preferTime.value,
        enrollmentBy.value,
        voluntary.value,
      );
      setForm(true);
    } else {
      if (!inputNameRef.current.value) {
        inputNameRef.current.focus();
        return;
      }
      if (!inputTelephoneRef.current.value) {
        inputTelephoneRef.current.focus();
        return;
      }
      if (!inputChildsRef.current.value) {
        inputChildsRef.current.focus();
        return;
      }
      if (!inputEnrollmentOrReplacementRef.current.value) {
        inputEnrollmentOrReplacementRef.current.focus();
        return;
      }
      if (!inputPreferTimeRef.current.value) {
        inputPreferTimeRef.current.focus();
        return;
      }
      if (!inputEnrollmentByRef.current.value) {
        inputEnrollmentByRef.current.focus();
        return;
      }
      if (!inputVoluntaryRef.current.value) {
        inputVoluntaryRef.current.focus();
        return;
      }
    }
  };

  if (form) return <DataSent />;
  return (
    <>
      <section className={`${styles.applicationFormBg}`}>
        <Head
          title="Ondas - Ilan Church | Ficha de inscrição"
          description="Essa é a página da ficha de inscrição."
        />
        <Title>Ficha de inscrição</Title>
        <form className={`${styles.form} container`} onSubmit={handleSubmit}>
          <Input
            label="Nome completo"
            id="name"
            required
            placeholder="Seu nome."
            type="text"
            elementRef={inputNameRef}
            {...name}
          />
          <Input
            label="Telefone"
            id="telephone"
            required
            placeholder="Seu telefone. Ex: 21980693443"
            type="tel"
            elementRef={inputTelephoneRef}
            {...telephone}
          />
          <Input
            label="Quantos filhos menor de idade ? Até 18 anos."
            id="childs"
            required
            placeholder="Sua resposta."
            type="number"
            elementRef={inputChildsRef}
            {...childs}
          />
          <h2>Inscrição ou reposição de aula</h2>
          <InputRadio
            options={[
              { id: 1, name: 'Inscrição' },
              { id: 2, name: 'Reposição da aula 01' },
              { id: 3, name: 'Reposição da aula 02' },
              { id: 4, name: 'Reposição da aula 03' },
            ]}
            elementRef={inputEnrollmentOrReplacementRef}
            {...enrollmentOrReplacement}
          />
          <h2>Qual o melhor horário para assistir as aulas no domingo ?</h2>
          <InputRadio
            options={[
              { id: 1, name: '9h' },
              { id: 2, name: '18h' },
            ]}
            elementRef={inputPreferTimeRef}
            {...preferTime}
          />
          <h2>Inscrição via ?</h2>
          <InputRadio
            options={[
              { id: 1, name: 'Instagram' },
              { id: 2, name: 'Jornada' },
              { id: 3, name: 'Outro' },
            ]}
            elementRef={inputEnrollmentByRef}
            {...enrollmentBy}
          />
          <h2>Voluntário que está fazendo a inscrição:</h2>
          <Input
            id="voluntary"
            required
            placeholder="Nome do voluntário."
            type="text"
            elementRef={inputVoluntaryRef}
            {...voluntary}
          />
          <Button disabled form={form}>
            {form ? 'Dados Enviado...' : 'Enviar'}
          </Button>
        </form>
      </section>
    </>
  );
};

export default ApplicationForm;
