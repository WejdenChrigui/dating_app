document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".page");

    function show(id) {
        pages.forEach(p => {
            p.classList.add("hidden");
            p.classList.remove("animate");
        });

        const target = document.getElementById(id);
        target.classList.remove("hidden");

        setTimeout(() => {
            target.classList.add("animate");
        }, 50);
    }

    // ✅ Navigation
    document.getElementById("startBtn").onclick = () => show("chooseSex");

    document.getElementById("girlBtn").onclick = () => {
    document.body.classList.remove("boy-bg");
    document.body.classList.add("girl-bg");
    show("choice");
};

document.getElementById("boyBtn").onclick = () => {
    document.body.classList.remove("girl-bg");
    document.body.classList.add("boy-bg");
    show("choice");
};


    document.getElementById("goRegister").onclick = () => show("register");
    document.getElementById("goLogin").onclick = () => show("login");

    document.getElementById("toLoginBtn").onclick = () => show("login");

    // ✅ INSCRIPTION
    document.getElementById("createAccountBtn").onclick = () => {

        const user = {
            login: document.getElementById("r_login").value,
            pass: document.getElementById("r_pass").value,
            nom: document.getElementById("r_nom").value,
            prenom: document.getElementById("r_prenom").value,
            age: document.getElementById("r_age").value,
            height: document.getElementById("r_height").value,
            job: document.getElementById("r_job").value,
            pref: document.getElementById("r_pref").value,
            photo: ""
        };

        if (!user.login || !user.pass) {
            alert("Login + mot de passe obligatoires !");
            return;
        }

        const photoInput = document.getElementById("r_photo");

        if (photoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = e => {
                user.photo = e.target.result;
                localStorage.setItem("user", JSON.stringify(user));
                alert("Compte créé ✅");
                show("login");
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Compte créé ✅");
            show("login");
        }
    };

    // ✅ PROFILS
    const profiles = [
        { name: "Sarra", age: 20, sex: "f", height: 165, job: "Designer", photo: "photos/girl1.jpg" },
        { name: "Maya", age: 23, sex: "f", height: 170, job: "Nurse",photo: "photos/girl2.jpg" },
        { name: "Lina", age: 25, sex: "f", height: 174, job: "Nurse",photo: "photos/girl3.jpg" },
        { name: "Adam", age: 25, sex: "m", height: 180, job: "Dev", photo: "photos/boy1.jpg"},
        { name: "Rami", age: 27, sex: "m", height: 186, job: "Engineer", photo: "photos/boy2.jpg" },
        { name: "bayrem", age: 30, sex: "m", height: 190, job: "Developper", photo: "photos/boy3.jpg" },

    ];

    let filtered = [];
    let idx = 0;
   


    const photo = document.getElementById("profilePhoto");

    function showProfile() {
        if (!filtered[idx]) {

        // Plus de profils → cacher les infos
        document.getElementById("pName").textContent = "Plus de profils 😢";
        photo.src = "";

        document.getElementById("pAge").textContent = "";
        document.getElementById("pHeight").textContent = "";
        document.getElementById("pJob").textContent = "";

        return;
    }

        const p = filtered[idx];

        photo.src = p.photo;
        document.getElementById("pName").textContent = p.name;
        document.getElementById("pAge").textContent = "Âge : " + p.age;
        document.getElementById("pHeight").textContent = "Taille : " + p.height;
        document.getElementById("pJob").textContent = "Métier : " + p.job;
    }

    // ✅ LOGIN
    document.getElementById("loginBtn").onclick = () => {

        const login = document.getElementById("l_login").value;
        const pass = document.getElementById("l_pass").value;

        const saved = JSON.parse(localStorage.getItem("user"));

        if (!saved) {
            alert("Pas de compte !");
            return;
        }

        if (login === saved.login && pass === saved.pass) {
            filtered = profiles.filter(p => p.sex === saved.pref);
            idx = 0;
            showProfile();
            show("dating");
        } else {
            alert("Login ou mot de passe incorrect ❌");
        }
    };

    document.getElementById("likeBtn").onclick = () => {
        idx++;
        showProfile();
    };

    document.getElementById("rejectBtn").onclick = () => {
        idx++;
        showProfile();
    };
    function generateHearts() {
    const container = document.querySelector(".hearts-container");

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 4 + Math.random() * 4 + "s";
        heart.style.fontSize = 15 + Math.random() * 25 + "px";
        heart.style.animationDelay = Math.random() * 5 + "s";

        container.appendChild(heart);
    }
}

generateHearts();

}

);
