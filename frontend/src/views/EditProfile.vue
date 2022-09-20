
Skip to content

Pricing

Sign in
Sign up
LilyB-G /
OC_Projet-7
Public

Code
Issues
Pull requests
Actions
Projects
Security

Insights

OC_Projet-7/frontend/src/views/EditProfile.vue
@LilyB-G
LilyB-G First commit
Latest commit eaab67d 20 hours ago
History
1 contributor
153 lines (142 sloc) 5.06 KB
<template>
<div class="col-lg-8 mx-auto mt-3">
    <div class="card">
        <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center mb-3">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle"
                    width="150">
                <label for="file-input">
                    <i class="bi bi-camera-fill"></i>
                </label>
                <input id="file-input" class="d-none" type="file" />
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Prénom-Nom</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Léo Pard">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Poste</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Chef de projet">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">E-mail personnel</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Leo@email.com">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">E-mail professionnel</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Leo@groupomania.com">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Téléphone personnel</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="01.62.06.07.33">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Téléphone professionnel</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="06.45.95.75.22">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Addresse</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Rue/Avenue/Lieu-dit">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Code Postal</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Code postal">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <h6 class="mb-0">Ville</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" value="Ville">
                </div>
            </div>
            <div class="row">
                <div class="text-secondary text-center">
                    <input type="button" class="btn btn-secondary px-4" value="Enregistrer">
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script></script>

<style scoped>
body {
background: #f7f7ff;
margin-top: 20px;
}
.card {
position: relative;
display: flex;
flex-direction: column;
min-width: 0;
word-wrap: break-word;
background-color: #fff;
background-clip: border-box;
border: 0 solid transparent;
border-radius: .25rem;
margin-bottom: 1.5rem;
box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}
.card .card-body {
display: flex;
flex-direction: column;
}
.card .card-body .row:last-child{
margin-bottom: 3rem;
}
.card .card-body>div:first-child {
position: relative;
align-self: center;
}
.me-2 {
margin-right: .5rem !important;
}
i.bi {
position: absolute;
bottom: 0;
right: 0;
border: 2px solid white;
padding: 1rem;
border-radius: 50%;
display: grid;
font-size: 1rem;
background-color: var(--bs-gray-200);
cursor: pointer;
}
i.bi:hover {
background-color: var(--bs-gray-300);
}
</style>
Footer
© 2022 GitHub, Inc.
Footer navigation

Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About

