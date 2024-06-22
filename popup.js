document.getElementById('apply').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    chrome.storage.sync.set({ option: selectedOption }, () => {
        console.log('Option saved:', selectedOption);
    });
});
