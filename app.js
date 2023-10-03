var selectedRow = null;

// show Alerts
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const main = document.querySelector('.main');
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//clear All fields
function clearFields() {
  document.querySelector('#firstname').value = '';
  document.querySelector('#lastname').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#number').value = '';
}

// add DATA
document.querySelector('#student-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form Values
  const firstname = document.querySelector('#firstname').value;
  const lastname = document.querySelector('#lastname').value;
  const email = document.querySelector('#email').value;
  const number = document.querySelector('#number').value;

  // validate
  if (firstname == '' || lastname == '' || email == '' || number == '') {
    showAlert('Please fill in all fields', 'danger');
  } else {
    if (selectedRow == null) {
      const list = document.querySelector('#student-list');
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${firstname}</td>
                    <td>${lastname}</td>
                    <td>${email}</td>
                    <td>${number}</td>
                    <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Modifier</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Supprimer</a>
                    `;
      list.appendChild(row);
      selectedRow = null;
      showAlert('Student Added', 'success');
    } else {
      selectedRow.children[0].textContent = firstname;
      selectedRow.children[1].textContent = lastname;
      selectedRow.children[2].textContent = email;
      selectedRow.children[3].textContent = number;
      selectedRow = null;
      showAlert('Student Info Edited', 'info');
    }
    clearFields();
  }
});

// Edit Data
document.querySelector('#student-list').addEventListener('click', (e) => {
  target = e.target;
  if (target.classList.contains('edit')) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector('#firstname').value =
      selectedRow.children[0].textContent;
    document.querySelector('#lastname').value =
      selectedRow.children[1].textContent;
    document.querySelector('#email').value =
      selectedRow.children[2].textContent;
    document.querySelector('#number').value =
      selectedRow.children[3].textContent;
  }
});

// Delete data
document.querySelector('#student-list').addEventListener('click', (e) => {
  target = e.target;
  if (target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
    showAlert('Student Data Deleted', 'danger');
  }
});
