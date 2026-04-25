// Array che rappresenta i siti creati
const data = [{},{}, {}, {}]; // Modifica aggiungendo o togliendo {} per cambiare il numero di siti

// Funzione per creare il widget
function creaWidget() {
  // Se il widget esiste già, non ricrearlo
  if(document.getElementById('widget-container')) return;

  const container = document.createElement('div');
  container.id = 'widget-container';
  container.className = 'widget-box';

  // Titolo principale
  const mainTitle = document.createElement('h2');
  mainTitle.textContent = 'SolaryStudios';
  mainTitle.style.margin = '0 0 10px 0';
  container.appendChild(mainTitle);

  // Numero dei siti creati
  const count = document.createElement('p');
  count.textContent = `${data.length} Siti Creati`;
  count.style.margin = '0 0 10px 0';
  container.appendChild(count);

  // Bottone per chiudere il widget
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Chiudi';
  closeBtn.onclick = () => {
    container.style.display = 'none';
    mostraBottone(); // mostra il bottone nella stessa posizione
  };
  container.appendChild(closeBtn);

  document.body.appendChild(container);
}

// Funzione per creare il bottone "Mostra Widget" nello stesso posto del widget
function mostraBottone() {
  let btn = document.getElementById('mostra-widget-btn');

  if(!btn) {
    btn = document.createElement('button');
    btn.id = 'mostra-widget-btn';
    btn.textContent = 'Mostra Widget';
    
    // Stile identico a prima
    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.padding = '10px 20px';
    btn.style.backgroundColor = '#ff9800';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '1000';
    btn.style.fontWeight = 'bold';

    btn.onclick = () => {
      document.getElementById('widget-container').style.display = 'block';
      btn.style.display = 'none';
    };

    document.body.appendChild(btn);
  } else {
    btn.style.display = 'block';
  }
}

// Inizializza il widget all'apertura della pagina
creaWidget();