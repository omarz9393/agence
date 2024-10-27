// URL de l'API Google Sheets pour récupérer les données JSON avec CORS Anywhere
const googleSheetURL = 'https://cors-anywhere.herokuapp.com/https://spreadsheets.google.com/feeds/list/2PACX-1vSVHRsmrVC23XMOx5Wcpdjweb_pGDTPpFuD4tNS11YWrXEFlCgcP8SYdqjhCVzTMdqPdVsgdfNUtlY7/od6/public/values?alt=json';

// Fonction pour charger les données depuis Google Sheets et les afficher dans le tableau
function loadGoogleSheet() {
    fetch(googleSheetURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de chargement des données Google Sheets : ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Vérifiez la structure complète des données dans la console
            const rows = data.feed.entry; // Accède aux entrées de données
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''; // Efface les lignes précédentes, s'il y en a

            rows.forEach(row => {
                // Extraire les valeurs de chaque champ, en utilisant les noms de colonnes définis dans la feuille Google Sheets
                const charger = row.gsx$nomchargeur ? row.gsx$nomchargeur.$t : '';
                const phone = row.gsx$téléphonechargeur ? row.gsx$téléphonechargeur.$t : '';
                const location = row.gsx$localisation ? row.gsx$localisation.$t : '';

                // Crée une nouvelle ligne pour chaque entrée
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${charger}</td><td>${phone}</td><td>${location}</td>`;
                tableBody.appendChild(tr);
            });

            console.log('Données affichées dans le tableau.');
        })
        .catch(error => console.error('Erreur lors du chargement des données Google Sheets:', error));
}

// Fonction de recherche pour filtrer le tableau
function searchTable() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#table-body tr');

    rows.forEach(row => {
        const chargerName = row.cells[0].textContent.toLowerCase();
        if (chargerName.includes(searchValue)) {
            row.style.display = ''; // Affiche la ligne
        } else {
            row.style.display = 'none'; // Cache la ligne
        }
    });
}

// Charger les données Google Sheets au chargement de la page
window.onload = loadGoogleSheet;
