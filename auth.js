const url = 'http://localhost:3300/api'

const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginEmail = loginForm.querySelector('input[type="email"]');
const loginPassword = loginForm.querySelector('input[type="password"]');

const signupUsername = signupForm.querySelector('input[type="text"]');
const signupEmail = signupForm.querySelector('input[type="email"]');
const signupPassword = signupForm.querySelector('input[type="password"]');


const token = localStorage.getItem("token");

if (token) {
  document.querySelector(".tabs").style.display = "none";
  document.querySelector("form").style.display = "none";
  document.querySelector(".logged").classList.add("active");
} else {
  document.querySelector(".tab").style.display = "flex";
  document.querySelector(".logged").style.display = "none";
}

loginTab.onclick = () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
};

signupTab.onclick = () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
};

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // يمنع إعادة تحميل الصفحة

    const email = loginEmail.value;
    const password = loginPassword.value;
    const data = { email, password }
    try {
    const res = await axios.post(`${url}/login`, data)
    console.log(res)
    alert(res.data.message)
    localStorage.setItem("token", res.data.token)
    if(res.data.isAdmin){
        localStorage.setItem("isAdmin", "true")
    }
    // location.href = "/"
        
    } catch (error) {
        console.log(error)
        if(error.message){
            alert(error.message)
        }else{

        alert(error.response.data.message)
        }
    }
});

signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;

    
    const data = { username, email, password }
    try {
    const res = await axios.post(`${url}/register`, data)
    console.log(res)
    alert(res.data.message)
    if(res.data.isAdmin){
        localStorage.setItem("isAdmin", "true")
    }
    localStorage.setItem("token", res.data.token)
    // location.href = "/"
        
    } catch (error) {
        console.log(error)
        alert(error.response.data.message)
    }
});
