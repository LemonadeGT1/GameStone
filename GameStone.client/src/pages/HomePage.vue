<template>
  <div class="justify-content-center container-fluid">
    <!-- SECTION HERO IMG-->
    <section class="row justify-content-center">
      <div class="col-12">
        <img class="img-fluid hero-img"
        src="https://images.unsplash.com/photo-1615806647582-53fea422c9b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
        alt="hero-img">
      </div>
      <div class="col-10 image-text">
        fgdf
      </div>
    </section>
    <!-- SECTION GROUPS -->
    <section class="row justify-content-center p-2">
      <div class="col-7">
        <h3>Find a Group</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti veritatis voluptatem illum
          inventore rerum. Unde omnis quasi doloremque, veritatis tempora qui maiores quibusdam ratione officia enim
          aperiam ad laboriosam?</p>
      </div>
      <div class="col-3">
        <img class="img-fluid group-img"
          src="https://images.unsplash.com/photo-1643992356285-6eb7c466f505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
          alt="group-img">
      </div>
    </section>
    <!-- SECTION GATHERINGS -->
    <section class="row justify-content-center p-2">
      <div class="col-3">
        <img class="img-fluid gathering-img"
          src="https://images.unsplash.com/photo-1677188010559-0667a1ed33a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80"
          alt="gathering-img">
      </div>
      <div class="col-7">
        <h3>Join a Gathering</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quo quae laboriosam architecto. Necessitatibus
          sapiente accusantium dolor dolorem nulla laudantium, reiciendis deserunt, ipsa molestiae odit laborum laboriosam
          corporis harum repellat?</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">

.image-text{
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.9px);
  -webkit-backdrop-filter: blur(5.9);
  border: 1px solid rgba(255, 255, 255, 0.43);
  background: 255, 255, 255, 0.55;
}
.hero-img {
  height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.group-img {
  height: 25vh;
  object-fit: cover;
  object-position: center;
}

.gathering-img {
  height: 25vh;
  object-fit: cover;
  object-position: center;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
