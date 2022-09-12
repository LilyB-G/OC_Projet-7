<template>
  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
      >
        <img
          src="@/components/img/icon-left-font-monochrome-white.svg"
          class="img-fluid25"
          alt="..."
        >
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarCollapse"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              to="/Home"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/User"
            >
              User
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link disabled"
              to="/Admin"
            >
              Admin
            </router-link>
          </li>
          <li class="nav-item dropup">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >Dropup</a>
            <ul class="dropdown-menu">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/Chat"
                >
                  Chat
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/Forum"
                >
                  Forum
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/News"
                >
                  News
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
  <style>
.img-fluid25 {  max-width : 33% ;
  }
  </style>
