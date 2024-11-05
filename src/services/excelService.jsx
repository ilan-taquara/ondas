const excelService = (props) => {
  const addToExcel = () => {
    fetch('https://ondas-backend-javascript-production.up.railway.app/adicionar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Exibirá "Dado adicionado com sucesso!"
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };
  const downloadExcel = async () => {
    try {
      const response = await fetch(
        'https://ondas-backend-javascript-production.up.railway.app/download',
      );
      const blob = await response.blob();

      // Criar um URL temporário e clicar nele para iniciar o download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cadastro.xlsx';
      document.body.appendChild(a);
      a.click();

      // Remover o URL temporário após o download
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar o arquivo XLSX:', error);
      alert('Erro ao baixar o arquivo XLSX.');
    }
  };
  return {
    addToExcel,
    downloadExcel,
  };
};

export default excelService;
