console.log('hooked up');

const signup = document.getElementById('signup-form')

signup.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const appName = event.target[1].value;
  fetchAuth(email, appName);
})

const fetchAuth = (email, appName) => {
  fetch('/api/v1/authenticate', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email,
      appName
    })
  })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      }     
    })
    .then(response => {
      document.getElementById('response-div').innerText =
        `You access token is ${response.token}.` +
        `Add your token to your database query with the follwing formatting:` +
        `/api/v1/games/12?token=${response.token}` +
        `You will need admin rights for write requests - see docs for more info`
    })
    .catch(error => { throw error; });
}
