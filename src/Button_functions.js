// Functionality for UPLOAD button
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click(); 

    document.getElementById('fileInput').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('File uploaded successfully');
                } else {
                    alert('File upload failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('File upload failed');
            });
        }
    });
});

// Functionality for VIEW ALL button
document.getElementById('viewButton').addEventListener('click', function() {
    fetch('http://localhost:3001/patients')
    .then(response => response.json())
    .then(data => {
        const patientDataDiv = document.getElementById('patientData');
        patientDataDiv.innerHTML = ''; // Clear previous data

        data.patients.forEach(patient => {
            const patientDiv = document.createElement('div');
            patientDiv.classList.add('patient');

            let patientHTML = `
                <p>Name: ${patient.name || ''}</p>
                <p>Email: ${patient.email || ''}</p>
                ${patient.dob ? `<p>Date of Birth: ${patient.dob}</p>` : ''}
                ${patient.gender ? `<p>Gender: ${patient.gender}</p>` : ''}
                ${patient.height ? `<p>Height: ${patient.height}</p>` : ''}
                ${patient.weight ? `<p>Weight: ${patient.weight}</p>` : ''}
                ${patient.address ? `<p>Address: ${patient.address}</p>` : ''}
                ${patient.mobile ? `<p>Mobile: ${patient.mobile}</p>` : ''}
                <hr>
            `;
            
            patientDiv.innerHTML = patientHTML;
            patientDataDiv.appendChild(patientDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve patient data');
    });
});

// Functionality for VIEW PATIENT button
document.getElementById('viewPatientButton').addEventListener('click', function() {
    const patientId = document.getElementById('patientIdInput').value;

    fetch(`http://localhost:3001/patient/${patientId}`)
    .then(response => response.json())
    .then(data => {
        const patientDataDiv = document.getElementById('patientData');
        patientDataDiv.innerHTML = ''; // Clear previous data

        if (data.success && data.patient) {
            const patient = data.patient;
            const patientDiv = document.createElement('div');
            patientDiv.classList.add('patient');

            let patientHTML = `
                <p>Name: ${patient.name || ''}</p>
                <p>Email: ${patient.email || ''}</p>
                ${patient.dob ? `<p>Date of Birth: ${patient.dob}</p>` : ''}
                ${patient.gender ? `<p>Gender: ${patient.gender}</p>` : ''}
                ${patient.height ? `<p>Height: ${patient.height}</p>` : ''}
                ${patient.weight ? `<p>Weight: ${patient.weight}</p>` : ''}
                ${patient.address ? `<p>Address: ${patient.address}</p>` : ''}
                ${patient.mobile ? `<p>Mobile: ${patient.mobile}</p>` : ''}
                <hr>
            `;

            patientDiv.innerHTML = patientHTML;
            patientDataDiv.appendChild(patientDiv);
        } else {
            patientDataDiv.innerHTML = `<p>No patient found with ID: ${patientId}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve patient data');
    });
});
