
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens et sections
            document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            // Afficher la section correspondante
        const sectionId = this.id.replace('-link', '');
        document.getElementById(sectionId).classList.add('active');
        
        // Afficher le premier formulaire de la section
        const firstFormStep = document.querySelector(`#${sectionId} .form-step`);
        if (firstFormStep) {
            firstFormStep.classList.add('active');
        }
        const stepId = document.querySelector(`#${sectionId} .step`);
        if (stepId) {
            stepId.classList.add('active');
        }
    });
});
    function goToStep(stepNumber) {
    // Aller directement à une étape spécifiée
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('form-step' + stepNumber).classList.add('active');

    // Mettre à jour les titres des étapes
    document.querySelector('.step.active').classList.remove('active');
    document.getElementById('step' + stepNumber).classList.add('active');

}

function nextStep(stepNumber) {
    goToStep(stepNumber);
}

function prevStep(stepNumber) {
    goToStep(stepNumber);
}

function resetForm() {
    // Réinitialiser le formulaire pour un nouveau projet
    document.getElementById('projectForm').reset();
    goToStep(1);
}

        function addRow() {
            const form = document.getElementById('form');
            const table = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
            
            const row = table.insertRow();
            const actionCell = row.insertCell();
            actionCell.innerHTML = `
                <button class="action-btn">Actions</button>
                <div class="dropdown-menu">
                    <a href="#" onclick="editRow(this)">Modifier le bon</a>
                    <a href="#" onclick="deleteRow(this)">Supprimer le bon</a>
                </div>
            `;
            
            for (const element of form.elements) {
                if (element.type !== 'button' && element.value.trim() !== '') {
                    const cell = row.insertCell();
                    cell.textContent = element.value;
                }
            }
            form.reset(); // Réinitialiser le formulaire après l'ajout
        }

        function editRow(element) {
            // Logique pour modifier le bon
            alert('Modifier le bon');
        }

        // script.js

document.addEventListener('DOMContentLoaded', () => {
    const actionIcons = document.querySelectorAll('.action-icon');
    
    actionIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Fermer tous les menus déroulants
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.parentElement.classList.remove('active');
            });
            
            // Afficher le menu déroulant sous l'icône cliquée
            this.parentElement.classList.toggle('active');
        });
    });

    // Fermer le menu si l'utilisateur clique en dehors
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.action-container')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.parentElement.classList.remove('active');
            });
        }
    });
});
function validateAndSubmitForm() {
    // Trouver le formulaire actif
    const activeFormStep = document.querySelector('.form-step.active');
    const form = activeFormStep.querySelector('form');
    
    if (!form) {
        console.error('Aucun formulaire trouvé.');
        return false;
    }

    let isValid = true;
    
    // Vérifier chaque champ du formulaire
    form.querySelectorAll('input').forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return false; // Empêche l'envoi du formulaire
    }
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Afficher les données dans la console (pour les tests)
    console.log('Données du formulaire:', data);
    
    // Créer une nouvelle requête AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/api/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Réponse du serveur
                console.log('Réponse du serveur:', xhr.responseText);
                // Ajouter un message de succès ou redirection, etc.
            } else {
                // Erreur lors de la requête
                console.error('Erreur:', xhr.statusText);
            }
        }
    };
    
    // Envoyer les données au serveur
    xhr.send(JSON.stringify(data));
    
    return false; // Empêche l'envoi par défaut du formulaire
}

    

