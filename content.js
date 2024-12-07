/*
Contact me:
- Email: noushadbhuiyan7@gmail.com
- Fiverr: fiverr.com/web_coder_nsd
*/

(function () {
    'use strict';

    // Utility function to create the floating button
    const createFloatButton = () => {
        const button = document.createElement('button');
        button.id = 'floatingButton';  // Set an ID for the button
        button.innerHTML = '✒️';
        button.style.cssText = 'position: fixed; top: 5px; right: 10px; z-index: 1000; padding: 10px 15px; font-size: 16px; border: none; border-radius: 5px; background-color: #0073b1; color: #fff; cursor: pointer; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2)';
        document.body.appendChild(button);
        return button;
    };

    // Function to periodically check for the positionElement and generate or remove the button
    const checkAndGenerateButton = () => {
        const nameElement = document.querySelector('h1');
        const positionElement = document.querySelector('.text-body-medium.break-words[data-generated-suggestion-target]');

        const existingButton = document.getElementById('floatingButton');  // Check if the button already exists

        // If both required elements are found and the button does not exist, create it
        if (nameElement && positionElement) {
            if (!existingButton) {
                const floatButton = createFloatButton();

                floatButton.addEventListener('click', async () => {
                    // Extract data
                    const name = nameElement.textContent.trim();
                    const position = positionElement.textContent.trim();
                    const profileUrl = window.location.href;

                    // Prompt the user for the row number
                    const rowNumber = prompt('Enter the row number to insert in the sheet:');
                    if (!rowNumber || isNaN(rowNumber)) {
                        alert('Invalid row number!');
                        return;
                    }

                    // Retrieve the spreadsheet and sheet name from Chrome storage
                    chrome.storage.sync.get(["spreadsheetName", "sheetName"], async (items) => {
                        const spreadsheetName = items.spreadsheetName;
                        const sheetName = items.sheetName;

                        // Check if both spreadsheetName and sheetName are available in storage
                        if (!spreadsheetName || !sheetName) {
                            alert('Please set both Spreadsheet Name and Sheet Name in the settings.');
                            return;
                        }

                        // API URL (replace with your actual Apps Script API URL)
                        const apiUrl = `https://script.google.com/macros/s/AKfycby_zsCu9W_1Yp2fhxaXlPtfWXOGTY9Jm8JG03RP4dNox3PyVuQMi2RH8Z30n5TErmTxPg/exec?action=insertData&name=${encodeURIComponent(name)}&position=${encodeURIComponent(position)}&url=${encodeURIComponent(profileUrl)}&row=${encodeURIComponent(rowNumber)}&spreadsheetName=${encodeURIComponent(spreadsheetName)}&sheetName=${encodeURIComponent(sheetName)}`;

                        // Update button state to processing
                        const originalText = floatButton.innerHTML;
                        floatButton.innerHTML = '⏳'; // Indicate processing
                        floatButton.style.backgroundColor = 'black';
                        floatButton.disabled = true; // Disable button to prevent multiple clicks

                        try {
                            const response = await fetch(apiUrl);
                            const result = await response.json();

                            if (result.result) {
                                floatButton.innerHTML = '✔️'; // Indicate success
                                floatButton.style.backgroundColor = 'white';
                            } else {
                                throw new Error(result.error || 'API returned failure');
                            }
                        } catch (error) {
                            floatButton.innerHTML = '❌'; // Indicate error
                            floatButton.style.backgroundColor = 'white';
                            console.error('Error:', error);
                        } finally {
                            // Re-enable the button and reset state after 3 seconds
                            setTimeout(() => {
                                floatButton.innerHTML = originalText;
                                floatButton.style.backgroundColor = '#0073b1';
                                floatButton.disabled = false; // Re-enable the button
                            }, 3000);
                        }
                    });
                });
            }
        } else if (existingButton) {
            // If the positionElement is not found, remove the button
            existingButton.remove();
        }
    };

    // Set an interval to check for the elements every 500 ms
    setInterval(checkAndGenerateButton, 500);

})();
