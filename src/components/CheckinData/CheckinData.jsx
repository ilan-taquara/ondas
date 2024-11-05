import React from 'react';
import Button from '../Button/Button';
import checkinService from '../../services/checkinService';
import styles from './CheckinData.module.css';
import chamadaService from '../../services/chamadaService';
import BarChart from '../BarChart/BarChart';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm/useForm';

const CheckinData = () => {
  const ministry = useForm();
  const classToday = useForm();
  const [col, setCol] = React.useState();
  const [dataCheckin, setDataCheckin] = React.useState();
  let objectsArray;
  let morningArray;
  let afternoonArray;
  let afternoonChilds;
  let morningChilds;
  let afternoonPeople = {};
  let totalAfternoonPeople = 0;
  let morningPeople = {};
  let totalMorningPeople = 0;

  if (dataCheckin) {
    objectsArray = dataCheckin.map((arr) => {
      const hour = arr[1];
      if (hour.includes(',')) {
        // console.log(arr[0]);
        // console.log('Tem virgula');
        return {
          name: arr[0],
          dateHour: arr[1],
          hour: +arr[1].split(', ')[1].slice(0, 2),
          childs: arr[2],
          childsName: arr[3],
          teacher: arr[4],
          numberOfClass: arr[5],
        };
      } else {
        // console.log(arr[0]);
        // console.log('Não tem virgula');
        return {
          name: arr[0],
          dateHour: arr[1],
          hour: +arr[1].split('/')[2].slice(5, 7),
          childs: arr[2],
          childsName: arr[3],
          teacher: arr[4],
          numberOfClass: arr[5],
        };
      }
    });
    {
      console.log(objectsArray);
    }
    afternoonArray = objectsArray.filter((arr) => {
      return arr.hour > 17;
    });
    morningArray = objectsArray.filter((arr) => {
      return arr.hour < 17;
    });
    if (afternoonArray.length) {
      // Pega quantidade de filhos
      afternoonChilds = afternoonArray
        .map((arr) => {
          return arr.childs;
        })
        .reduce((acumulador, atual) => acumulador + atual, 0);

      // Pega quantidade de pessoas
      afternoonArray.forEach((afternoon) => {
        if (!afternoonPeople[afternoon.name]) {
          afternoonPeople[afternoon.name] = true;
          totalAfternoonPeople++;
        }
      });
    }
    if (morningArray.length) {
      // Pega quantidade de filhos
      morningChilds = morningArray
        .map((arr) => {
          return arr.childs;
        })
        .reduce((acumulador, atual) => acumulador + atual);

      // Pega quantidade de pessoas
      morningArray.forEach((morning) => {
        if (!morningPeople[morning.name]) {
          morningPeople[morning.name] = true;
          totalMorningPeople++;
        }
      });
    }
  }

  const dataAfternoon = {
    labels: ['Total geral de filhos', 'Total de alunos'],
    datasets: [
      {
        label: 'Total',
        data: [afternoonChilds, totalAfternoonPeople],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const optionsAfternoon = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico alunos de tarde',
      },
    },
  };

  const dataMorning = {
    labels: ['Total geral de filhos', 'Total de alunos'],
    datasets: [
      {
        label: 'Total',
        data: [morningChilds, totalMorningPeople],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const optionsMorning = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico alunos de manhã',
      },
    },
  };

  const handleSubmitMinisterio = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/generateDocs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mes: ministry.value }),
    });
    console.log(response);
  };

  const handleSubmitPrimeiroContato = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/primeiro_contato');
    console.log(response);
  };

  const handleSubmitMensagensFaltas = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/mensagens_faltas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aulaFaltada: classToday.value }),
    });
    console.log(response);
  };

  let i = 0;
  return (
    <section>
      <div className={`${styles.actions}`}>
        <h2>Ações da Planilha Checkin</h2>
        <Button
          onClick={async () =>
            console.log(await checkinService().updateChamadaExcel())
          }
        >
          Atualizar dados checkin para planilha chamada
        </Button>
        <Button
          onClick={async () => {
            const dadosJson = await checkinService().dataCheckinExcel();
            setDataCheckin(dadosJson.slice(1));
            setCol(dadosJson[0]);
          }}
        >
          Mostrar dados Excel Checkin
        </Button>
        <Button onClick={() => checkinService().downloadExcel()}>
          Download Dados Excel Checkin
        </Button>
      </div>

      <div className={`${styles.actions}`}>
        <h2>Ações diversas</h2>
        <Button
          onClick={() => {
            chamadaService().downloadExcel();
          }}
        >
          Download Dados Excel Chamada
        </Button>
      </div>

      {/* <div className={`${styles.actionsContacts}`}>
        <h2>Filtrar ministerios e fazer contatos</h2>
        <form className={`${styles.form} `} onSubmit={handleSubmitMinisterio}>
          <Input
            id="ministry"
            required
            label="Qual mês deseja filtrar ?"
            placeholder="Exemplo: MAI23"
            {...ministry}
          />
          <Button>Filtrar pessoas ministerios</Button>
        </form>

        <form
          className={`${styles.form}`}
          onSubmit={handleSubmitMensagensFaltas}
        >
          <Input
            id="classToday"
            required
            label="Qual aula será ministrada essa semana ?"
            placeholder="Exemplo: 1"
            {...classToday}
          />
          <Button>Entrar em contato com alunos que tem aula a concluir</Button>
        </form>

        <form
          className={`${styles.form}`}
          onSubmit={handleSubmitPrimeiroContato}
        >
          <Button>Entrar em contato com visitantes</Button>
        </form>
      </div> */}
      <div className={`${styles.data}`}>
        {col && (
          <>
            <h2>Todos os alunos da Planilha Checkin</h2>
            <table>
              <thead>
                <tr>
                  {col.map((colName, index) => (
                    <th scope="col" key={colName + index}>
                      {colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {objectsArray.map((objets, index) => {
                  return (
                    <>
                      <tr>
                        <th scope="col" key={objets.name + index}>
                          {objets.name}
                        </th>
                        <td>{objets.dateHour}</td>
                        <td>{objets.childs}</td>
                        <td>{objets.childsName}</td>
                        <td>{objets.teacher}</td>
                        <td>{objets.numberOfClass}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {afternoonArray && morningArray && (
          <>
            <div className={`${styles.table}`}>
              <h1>Tabela somente de alunos a tarde</h1>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Filhos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {afternoonArray.map(({ name, childs }, index) => {
                      return (
                        <>
                          <tr>
                            <th key={name + index}>{name}</th>
                            <td>{childs}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <table>
                  <thead>
                    <tr>
                      <th>Total filhos</th>
                      <td>Total alunos</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{afternoonChilds}</th>
                      <td>{totalAfternoonPeople}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`${styles.table}`}>
              <h1>Tabela somente de alunos manhã</h1>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Filhos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {morningArray.map(({ name, childs }, index) => {
                      return (
                        <>
                          <tr>
                            <th key={name + index}>{name}</th>
                            <td>{childs}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <table>
                  <thead>
                    <tr>
                      <th>Total filhos</th>
                      <td>Total alunos</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{morningChilds}</th>
                      <td>{totalMorningPeople}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <BarChart data={dataAfternoon} options={optionsAfternoon} />
            <BarChart data={dataMorning} options={optionsMorning} />
          </>
        )}
      </div>
    </section>
  );
};

export default CheckinData;
