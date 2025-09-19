function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.add('show');
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.remove('show');
}
