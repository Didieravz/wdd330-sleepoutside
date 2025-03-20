export default class Alert {
    constructor(alertsFile) {
      this.alertsFile = alertsFile;
    }
  
    async loadAlerts() {
      try {
        const response = await fetch(this.alertsFile);
        const alerts = await response.json();
  
        if (alerts.length > 0) {
          this.displayAlerts(alerts);
        }
      } catch (error) {
        console.error("Error loading alerts:", error);
      }
    }
  
    displayAlerts(alerts) {
      const mainElement = document.querySelector("main");
      if (!mainElement) {
        console.error("Main element not found");
        return;
      }
  
      const section = document.createElement("section");
      section.classList.add("alert-list");
  
      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.message;
        p.style.background = alert.background;
        p.style.color = alert.color;
        section.appendChild(p);
      });
  
      // **Aquí usamos prepend() para insertar la sección al inicio del <main>**
      mainElement.prepend(section);
    }
  }
  