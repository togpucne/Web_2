    const currentLocation = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split("/").pop();

        if (linkHref === currentLocation) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
