document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Récupération des champs
        let prenom = document.getElementById("prenom")?.value.trim();
        let nom = document.getElementById("nom")?.value.trim();
        let telephone = document.getElementById("telephone")?.value.trim();
        let email = document.getElementById("email")?.value.trim();
        let message = document.getElementById("message")?.value.trim();

        // Validation
        let errorMessage = "Veuillez remplir tous les champs requis :";
        let hasError = false;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!prenom) {
            errorMessage += "\n- Prénom";
            hasError = true;
        }
        if (!nom) {
            errorMessage += "\n- Nom";
            hasError = true;
        }
        if (!telephone) {
            errorMessage += "\n- Téléphone";
            hasError = true;
        }
        if (!email) {
            errorMessage += "\n- Courriel";
            hasError = true;
        } else if (!emailRegex.test(email)) {
            errorMessage += "\n- Format du courriel invalide";
            hasError = true;
        }
        if (!message) {
            errorMessage += "\n- Message";
            hasError = true;
        }

        // Affichage d'erreur
        if (hasError) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: errorMessage
            });
            return;
        }

        // Préparation des données JSON
        let formData = JSON.stringify({
            prenom,
            nom,
            telephone,
            email,
            message
        });

        // Envoi du formulaire
        try {
            let response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Formulaire envoyé!",
                    text: "Nous avons bien reçu votre message.",
                    showConfirmButton: false,
                    timer: 2500
                });
                setTimeout(() => {
                    form.reset();
                }, 2000);
            } else {
                throw new Error("Erreur lors de l'envoi du formulaire.");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur s'est produite. Veuillez réessayer plus tard."
            });
            console.error("Form submission error:", error);
        }
    });
});