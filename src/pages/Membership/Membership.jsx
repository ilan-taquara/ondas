import React from 'react';
import styles from './Membership.module.css';
import Head from '../../hooks/Head/Head';
import Title from '../../components/Title/Title';
import useForm from '../../hooks/useForm/useForm';
import DataSent from '../../components/DataSent/DataSent';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import InputRadio from '../../components/InputRadio/InputRadio';
import membershipService from '../../services/membershipService';

const Membership = () => {
  const name = useForm();
  const dateOfBirth = useForm();
  const telephone = useForm('telephone');
  const address = useForm();
  const maritalStatus = useForm();
  const nameSpouse = useForm();
  const nameChilds = useForm();
  const acceptedJesus = useForm();
  const whenAcceptedJesus = useForm();
  const whereAcceptedJesus = useForm();
  const baptized = useForm();
  const whenBaptized = useForm();
  const whereBaptized = useForm();
  const completedClassOne = useForm();
  const whenCompletedClassOne = useForm();
  const memberIlan = useForm();
  const [form, setForm] = React.useState();

  const nameRef = React.useRef();
  const dateOfBirthRef = React.useRef();
  const telephoneRef = React.useRef();
  const addressRef = React.useRef();
  const maritalStatusRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name.validate() &&
      dateOfBirth.validate() &&
      telephone.validate() &&
      address.validate() &&
      maritalStatus.validate()
    ) {
      membershipService({
        name: name.value,
        dateOfBirth: dateOfBirth.value,
        telephone: telephone.value,
        address: address.value,
        maritalStatus: maritalStatus.value,
        nameSpouse: nameSpouse.value,
        nameChilds: nameChilds.value,
        acceptedJesus: acceptedJesus.value,
        whenAcceptedJesus: whenAcceptedJesus.value,
        whereAcceptedJesus: whereAcceptedJesus.value,
        baptized: baptized.value,
        whenBaptized: whenBaptized.value,
        whereBaptized: whereBaptized.value,
        completedClassOne: completedClassOne.value,
        whenCompletedClassOne: whenCompletedClassOne.value,
        memberIlan: memberIlan.value,
      }).addToExcel();
      setForm(true);
    } else {
      if (!nameRef.current.value) {
        nameRef.current.focus();
        return;
      }
      if (!dateOfBirthRef.current.value) {
        dateOfBirthRef.current.focus();
        return;
      }
      if (!telephoneRef.current.value) {
        telephoneRef.current.focus();
        return;
      }
      if (!addressRef.current.value) {
        addressRef.current.focus();
        return;
      }
      if (!maritalStatusRef.current.value) {
        maritalStatusRef.current.focus();
        return;
      }
    }
  };

  if (form) return <DataSent />;
  return (
    <>
      <Head
        title="Ondas - Ilan Church | Ficha de Membresia"
        description="Essa é a página Ficha de Membresia."
      />
      <Title>Ficha de Membresia</Title>
      <form className={`${styles.form} container`} onSubmit={handleSubmit}>
        <Input
          label="Nome completo"
          id="name"
          required
          placeholder="Seu nome."
          type="text"
          elementRef={nameRef}
          {...name}
        />
        <Input
          label="Data de nascimento"
          id="dateOfBirth"
          required
          placeholder="Sua data de nascimento."
          type="text"
          elementRef={dateOfBirthRef}
          {...dateOfBirth}
        />
        <Input
          label="Contato"
          id="telephone"
          required
          placeholder="Seu contato. Ex: 2190000-0000"
          type="tel"
          elementRef={telephoneRef}
          {...telephone}
        />
        <Input
          label="Endereço"
          id="address"
          required
          placeholder="Seu endereço"
          type="text"
          elementRef={addressRef}
          {...address}
        />
        <p>Estado Civil </p>
        <InputRadio
          options={[
            { id: 1, name: 'Solteiro(a)' },
            { id: 2, name: 'Casado(a)' },
            { id: 3, name: 'Viúvo(a)' },
            { id: 4, name: 'Divorciado(a)' },
            { id: 5, name: 'União Estável' },
          ]}
          elementRef={maritalStatus}
          {...maritalStatus}
        />
        <Input
          label="Nome Cônjuge"
          id="nameSpouse"
          required
          placeholder="Nome do cônjuge."
          type="text"
          {...nameSpouse}
        />
        <Input
          label="Nome Filho"
          id="nameChilds"
          required
          placeholder="Nome dos filhos."
          type="text"
          {...nameChilds}
        />
        <p>Você já entregou sua vida a Jesus e confiou sua salvação a Ele ? </p>
        <InputRadio
          options={[
            { id: 1, name: 'Sim' },
            { id: 2, name: 'Não' },
          ]}
          {...acceptedJesus}
        />
        <Input
          label="Se sim, quando ?"
          id="whenAcceptedJesus"
          required
          placeholder="Quando ?"
          type="text"
          {...whenAcceptedJesus}
        />
        <Input
          label="Se sim, onde ?"
          id="whereAcceptedJesus"
          required
          placeholder="Onde ?"
          type="text"
          {...whereAcceptedJesus}
        />
        <p>
          Você já foi batizado nas águas depois qque entregou a vida a Jesus ?{' '}
        </p>
        <InputRadio
          options={[
            { id: 1, name: 'Sim' },
            { id: 2, name: 'Não' },
          ]}
          {...baptized}
        />
        <Input
          label="Se sim, quando ?"
          id="whenBaptized"
          required
          placeholder="Quando ?"
          type="text"
          {...whenBaptized}
        />
        <Input
          label="Se sim, onde ?"
          id="whereBaptized"
          required
          placeholder="Onde ?"
          type="text"
          {...whereBaptized}
        />
        <p>Já completou a Aula 01 do Curso Ondas ? </p>
        <InputRadio
          options={[
            { id: 1, name: 'Sim' },
            { id: 2, name: 'Não' },
          ]}
          {...completedClassOne}
        />
        <Input
          label="Se sim, quando ?"
          id="whenCompletedClassOne"
          required
          placeholder="Quando ?"
          type="text"
          {...whenCompletedClassOne}
        />
        <p>Você vive de acordo com a Aliança de Membro da Ilan ? </p>
        <InputRadio
          options={[
            { id: 1, name: 'Sim' },
            { id: 2, name: 'Não' },
          ]}
          {...memberIlan}
        />
        <Button form={form}>{form ? 'Dados Enviado...' : 'Enviar'}</Button>
      </form>
    </>
  );
};

export default Membership;
