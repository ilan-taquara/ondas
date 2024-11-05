const checkinService = (props) => {
  const addToExcel = () => {
    fetch(
      'https://ondas-backend-javascript-production.up.railway.app/addMembershipToChamadaExcel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      },
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };
  return {
    addToExcel,
  };
};

export default checkinService;
