document.addEventListener("DOMContentLoaded", () => {
    const spreadsheetInput = document.getElementById("spreadsheetName");
    const sheetInput = document.getElementById("sheetName");
    const saveButton = document.getElementById("saveButton");
  
    // Load saved settings
    chrome.storage.sync.get(["spreadsheetName", "sheetName"], (items) => {
      if (items.spreadsheetName) spreadsheetInput.value = items.spreadsheetName;
      if (items.sheetName) sheetInput.value = items.sheetName;
    });
  
    // Save settings
    saveButton.addEventListener("click", () => {
      const spreadsheetName = spreadsheetInput.value.trim();
      const sheetName = sheetInput.value.trim();
  
      chrome.storage.sync.set({ spreadsheetName, sheetName }, () => {
        alert("Settings saved!");
      });
    });
  });
  