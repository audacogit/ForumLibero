// Saves options to chrome.storage
function save_options() {
  var bloccati = document.getElementById('bloccati').value;
  var nascondi_ultimo = document.getElementById('nascondi_ultimo').checked;
  chrome.storage.sync.set({
    bloccati: bloccati,
    nascondi_ultimo: nascondi_ultimo
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'OPZIONI SALVATE CORRETTAMENTE.';
    var status2 = document.getElementById('status2');
    status2.textContent = 'Ricarica la pagina del forum per rendere effettive le nuove opzioni dopo averle salvate.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores input box state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value bloccati = '' and nascondi_ultimo = false.
  chrome.storage.sync.get({
    bloccati: '',
    nascondi_ultimo: false
  }, function(items) {
    document.getElementById('bloccati').value = items.bloccati;
    document.getElementById('nascondi_ultimo').checked = items.nascondi_ultimo;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);