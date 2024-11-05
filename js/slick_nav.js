let currentUser = localStorage.getItem('currentUser');

if (currentUser) {
    document.getElementById('userName').innerText = currentUser;
    document.getElementById('userGreeting').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
} else {
    document.getElementById('userGreeting').style.display = 'block';
    document.getElementById('userProfile').style.display = 'none';
}
