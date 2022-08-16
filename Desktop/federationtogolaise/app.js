import { movies } from "./movies.js";

function fetchAllMovies(movies) {
    // Récupération de l'élement
    const elApp = document.getElementsByTagName("tbody")[0];
    elApp.innerHTML = "";
  
    let data = "";
    // Récupération des données
   
    movies.forEach((m, index) => {
        data += `
    <tr>
          <td>${m.Nom}</td>
          <td>${m.Nationalite}</td>
          <td>${m.Club}</td>
          <td>${m.Experience}</td>
    <td>
          
    <button class="edit btn btn-sm btn-outline-success" value="${index}">
            Modifier
          </button>
          <button class="delete btn btn-sm btn-outline-danger" value="${index}">
            Supprimer
          </button>
    </td>

    </tr>`;
      });
  
    // Affichage des éléments dans le HTML
    if (data.length > 0) {
        // Affichage des données dans le tableau
    elApp.innerHTML += data;

    // Chaque bouton "Editer"
document.querySelectorAll("button.edit").forEach(b => {
    b.addEventListener("click", function() {
      return editMovie(this.value);
    });
  });
// Chaque bouton "Supprimer"
document.querySelectorAll("button.delete").forEach(b => {
    b.addEventListener("click", function() {
      return deleteMovie(this.value);
    });
  });
} else {
    // Aucune donnée
    elApp.innerHTML += "<p>Aucune ligne trouvée</p>";
  }

  } 
  fetchAllMovies(movies);
  
  document.querySelectorAll("input[type=search]")[0]
  .addEventListener("input", search);


  function search() {
    const filteredData = movies.filter(movie =>
      movie.name.toLowerCase().includes(this.value.toLowerCase())
    );
    fetchAllMovies(filteredData);
  }

  const elForm = document.getElementById("form");
  elForm.style.display = "none";
  const elContent = document.getElementById("content");
document.getElementById("form-add").addEventListener("click", function() {
  displayForm();
});

function displayForm() {
    elForm.style.display = "block";
    elContent.style.display = "none";
  }

  document.getElementById("form-save").addEventListener("click", function() {
    // Récupération des champs
    const Nom = document.getElementById("noms").value;
    const Nationalite = document.getElementById("nationalites").value;
    const Club = document.getElementById("clubs").value;
    const Experience = document.getElementById("experiences").value;
  
    if (Nom && Nationalite && Club && Experience) {
      // Nouvelle ligne
      const movie = { Nom: noms, Nationalite: nationalites , Club: clubs, Experience: experiences};
  
      // Ajout de la nouvelle ligne
      if (document.getElementById("hidden").value.length > 0) {
        movies.splice(document.getElementById("hidden").value, 1, movie);
      } else {
        movies.push(movie);
      }
  
      // Affichage du nouveau tableau
      return fetchAllMovies(movies);
    }
  });
  function hideForm() {
    elForm.style.display = "none";
    elContent.style.display = "block";
  
    document.getElementById("noms").value = "";
    document.getElementById("nationalites").value = "";
    document.getElementById("clubs").value = "";
    document.getElementById("experiences").value = "";
    document.getElementById("hidden").value = "";
  }
  document.getElementById("form-cancel").addEventListener("click", function() {
    hideForm();
  });
  function editMovie(index) {
    // Récupération de la ligne via son index
    const movie = movies.find((m ,i) => {
      return i == index;
      
    });
    
    // Alimentation des champs
    document.getElementById("noms").value = movie.Nom;
    document.getElementById("nationalites").value = movie.Nationalite;
    document.getElementById("clubs").value = movie.Club;
    document.getElementById("experiences").value = movie.Experience;
    document.getElementById("hidden").value = index;

    displayForm();
   }


function deleteMovie(index) {
  if (confirm("Confirmez-vous la suppression de ce film ?")) {
    movies.splice(index, 1);
    fetchAllMovies(movies);
  }
}

console.table(movies);