<template>
  <h2 class="mt-4">
    Three unequal columns
  </h2>
  <p>
    Get three columns <strong>starting at desktops and scaling to large desktops</strong> of various widths. Remember,
    grid columns should add up to twelve for a single horizontal block. More than that, and columns start stacking no
    matter the viewport.
  </p>
  <div class="row mb-3 text-center">
    <div class="col-md-3 themed-grid-col">
      .col-md-3
    </div>
    <div class="col-md-6 themed-grid-col">
      .col-md-6
    </div>
    <div class="col-md-3 themed-grid-col">
      .col-md-3
    </div>
  </div>

  <router-view />
</template>
<script>

</script>