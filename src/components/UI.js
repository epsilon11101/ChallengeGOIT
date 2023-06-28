const messages = [
  "Patient, be...",
  "Calm, Jedi...",
  "There, almost we are...",
  "Just a little more, there is...",
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

export const footer = () => {
  return `
    <footer>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <p class="text-center">
                <a href="https://github.com/epsilon11101" target="_blank">amv</a> - 2023 - <span>made
                  the force be with you<span />
                </p>
              </div>
            </div>
          </div>
    </footer>
    `;
};
