const messages = [
  "Be patient...",
  "Calm Jedi...",
  "We're almost there...",
  "Just a little more...",
];

export const progressTemplate = () => {
  return `
            <div class="spinner show">
                <p class="loading-message">${
                  messages[Math.floor(Math.random() * messages.length)] ??
                  "Loading..."
                }</p>
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            <div>
            
    `;
};

export const showProgress = (spinner) => {
  spinner.classList.remove("hide");
  spinner.classList.add("show");
};

export const hideProgress = (spinner) => {
  spinner.classList.remove("show");
  spinner.classList.add("hide");
};
