chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendData") {
      const { name, position, profileUrl, rowNumber, spreadsheetName, sheetName } = request.data;
  
      const apiUrl = `https://script.google.com/macros/s/AKfycby_zsCu9W_1Yp2fhxaXlPtfWXOGTY9Jm8JG03RP4dNox3PyVuQMi2RH8Z30n5TErmTxPg/exec?action=insertData&name=${encodeURIComponent(name)}&position=${encodeURIComponent(position)}&url=${encodeURIComponent(profileUrl)}&row=${encodeURIComponent(rowNumber)}&spreadsheetName=${encodeURIComponent(spreadsheetName)}&sheetName=${encodeURIComponent(sheetName)}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            alert("Data successfully sent!");
          } else {
            alert("Error: " + result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send data. Check the console for details.");
        });
    }
  });
  