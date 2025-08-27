const content = (email, username) => {
  return `
    <div class="card">
      <h3>${email}</h3>
      <p>${username}</p>
    </div>
  `;
};

const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const url = 'http://localhost:3300/api';

const getUsers = async () => {
  if (!isAdmin) {
    alert("Access denied. Admins only.");
    return;
  }

  try {
    const res = await axios.get(`${url}/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res)
    const users = res.data || [];
    const usersMap = users.map(user => content(user.email, user.username));
    
    document.querySelector(".container").innerHTML = usersMap.join('');
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "An error occurred while fetching users");
  }
};
getUsers();