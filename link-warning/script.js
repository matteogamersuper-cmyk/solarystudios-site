document.addEventListener("DOMContentLoaded", () => {
  // crea HTML dinamicamente
  const overlay = document.createElement("div");
  overlay.id = "lw-overlay";

  overlay.innerHTML = `
    <div id="lw-box">
      <p>Stai per lasciare il sito. Vuoi continuare?</p>
      <button id="lw-continue">Continua</button>
      <button id="lw-cancel">Annulla</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const continueBtn = document.getElementById("lw-continue");
  const cancelBtn = document.getElementById("lw-cancel");

  let targetLink = null;

  // intercetta tutti i link
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function(e) {
      const url = new URL(this.href);

      if (url.hostname !== window.location.hostname) {
        e.preventDefault();
        targetLink = this.href;
        overlay.style.display = "flex";
      }
    });
  });

  continueBtn.addEventListener("click", () => {
    if (targetLink) window.location.href = targetLink;
  });

  cancelBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    targetLink = null;
  });
});