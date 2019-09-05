import { Brstm } from '../shared/brstm.js';

document.addEventListener('DOMContentLoaded', () => {
  const fileElement = document.getElementById('file');
  const elErrors = document.getElementById('errors');

  fileElement.setAttribute('disabled', 'disabled');

  fileElement.addEventListener('change', () => {
    const file = fileElement.files[0];
    const headerReader = new FileReader();
    headerReader.addEventListener('loadend', async (ev) => {
      try {
        const buffer = headerReader.result;

        const brstm = new Brstm(buffer);
        renderMetadata(brstm.metadata);
      } catch (e) {
        elErrors.textContent = e.message;
      }
    });
    headerReader.readAsArrayBuffer(file);
  });

  function renderMetadata(metadata) {
    const metadataContainerElement = document.getElementById(
      'metadata-container'
    );
    metadataContainerElement.style.display = 'block';
    const metadataBodyElement = document.getElementById('metadata-body');
    const metadataRowTemplateElement = document.getElementById('metadata-row');
    metadataBodyElement.innerHTML = '';
    for (const [key, value] of Object.entries(metadata)) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        continue;
      }
      const clone = document.importNode(
        metadataRowTemplateElement.content,
        true
      );
      const td = clone.querySelectorAll('td');
      td[0].textContent = key;
      td[1].textContent = value;
      metadataBodyElement.appendChild(clone);
    }
  }

  fileElement.removeAttribute('disabled');
});
