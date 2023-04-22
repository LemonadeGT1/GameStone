<template>
  <div class="container">
    <div class="row my-2">
      <div class="col-12">
        <div class="about">
          <h2>About</h2>
          <p>Ever had this problem? "So, I bought this $150 board game, but I don't have anybody to play with!"</p>
          <h3>Description</h3>
          <p>This site allows individuals to find other people to play with by way of gatherings and groups.</p>
          <ul>
            <li>Gatherings are events open to new players based around games and a date to play.</li>
            <li>Groups are for like-minded individuals to be able to chat with one another, see each others games, and
              create
              new gatherings.</li>
          </ul>
          <h3>Languages and Tools</h3>
          <ul>
            <li>JavaScript</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Vue</li>
            <li>Git</li>
            <li>MongoDB</li>
            <li>Auth0</li>
            <li>node.js</li>
            <li>Bootstrap</li>
            <li>Socket.io</li>
            <li>AtlasApi</li>


          </ul>
          <h3 class="pb-4">Contributors</h3>


          <div class="row pb-5">
            <div class="col-4 d-flex justify-content-center">
              <img class="profile-picture"
                src="https://s3.amazonaws.com/comicgeeks/characters/avatars/98.jpg?t=1661544547">
            </div>
            <div class="col-8 d-flex flex-column justify-content-center">
              <h3 class="p-2">Michael Patience
              </h3>
              <p>Michael is a Spring23 CodeWorks Student. He has enjoyed coding since the days of Apple II's and Commodore
                64's. Loves Aviation, Board Games, Family, Hiking, and many other activities.</p>
            </div>
          </div>
        </div>


        <div class="row pb-5">
          <div class="col-4 d-flex justify-content-center">
            <img class="profile-picture"
              src="https://cdn.europosters.eu/image/1300/posters/the-big-lebowski-the-dude-i75968.jpg">
          </div>
          <div class="col-8 d-flex flex-column justify-content-center">
            <h3 class="p-2">Ian Grell</h3>
            <p>Also a Spring23 CodeWorks student. The Dude Abides.</p>
          </div>
        </div>


        <div class="row pb-5">
          <div class="col-4 d-flex justify-content-center">
            <img class="profile-picture" src="https://i.kym-cdn.com/photos/images/facebook/001/274/170/594.png">
          </div>
          <div class="col-8 d-flex flex-column justify-content-center">
            <h3 class="p-2">Chandler Bowman
            </h3>
            <p>We kept calm through the whole project, hopefully it's good enough.WAAAAAAGGHHH</p>
          </div>
        </div>


        <div class="row pb-5">
          <div class="col-4 d-flex justify-content-center">
            <img class="profile-picture" src="https://i.insider.com/5e32f2a324306a19834af322?width=700">
          </div>
          <div class="col-8 d-flex flex-column justify-content-center">
            <h3 class="p-2">Isaac Duff
            </h3>
            <p>Isaac is an active Spring23 CodeWorks student. A lover of DND, books, video games and his dog Sage. </p>
          </div>
        </div>


        <div class="row pb-5">
          <div class="col-4 d-flex justify-content-center">
            <img class="profile-picture"
              src="https://vignette.wikia.nocookie.net/disney/images/6/64/Kronk_.jpg/revision/latest?cb=20160720194635">
          </div>
          <div class="col-8 d-flex flex-column justify-content-center">
            <h3 class="p-2">William Edwards
            </h3>
            <p>Spring23 CodeWorks student. William enjoys hunting,fishing, video games, golf (even tho he's not very
              good), and watching movies.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>



<style scoped lang="scss">
.profile-picture {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border-style: solid;
  border-color: #0e0d0d;
  border-width: 2px;
}
</style>
