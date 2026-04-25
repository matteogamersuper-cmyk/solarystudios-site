document.addEventListener("DOMContentLoaded", () => {
    const alreadyAccepted = localStorage.getItem("solarystudios_widget_ok");

    if (alreadyAccepted) return;

    const widget = document.createElement("div");
    widget.id = "cookie-widget";

    widget.innerHTML = `
        <div class="cookie-box">
            <p>Questo sito salva alcune preferenze solo nel tuo browser per funzionare correttamente.</p>
            <button id="cookie-ok">Ok</button>
        </div>
    `;

    document.body.appendChild(widget);

    const btn = document.getElementById("cookie-ok");

    btn.addEventListener("click", () => {
        localStorage.setItem("solarystudios_widget_ok", "true");
        widget.remove();
    });
});