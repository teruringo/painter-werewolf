<template>
  <div class="flex-grow flex-1 w-auto h-screen">
    <!-- LOBBY -->
    <template v-if="!isJoined">
      <div class="container">
        <header class="header">
          <div class="wrap">
            <h1>
              <img class="header-logo" src="/images/lobby2.svg" alt="LOBBY" />
            </h1>
          </div>
        </header>
        <RoomCreate class="w-full mt-4" />
        <RoomList class="w-full mt-3" />
      </div>
      <div class="w-full mb-3 text-center">
        <nuxt-link class="underline font-round hover:font-bold text-sm" to="/">
          ログインページへ戻る
        </nuxt-link>
      </div>
    </template>

    <!-- ROOM -->
    <template v-else>
      <div class="room-container">
        <Room class="w-full" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoomCreate from '~/components/RoomCreate.vue'
import RoomList from '~/components/RoomList.vue'
import Room from '~/components/Room.vue'

export default Vue.extend({
  components: {
    RoomCreate,
    RoomList,
    Room,
  },
  async validate({ app, redirect }) {
    return await app.$accessor.auth
      .asyncAuth()
      .then(async () => {
        if (!Object.keys(app.$room.info).length)
          await app.$room.reJoin(app.$accessor.auth.user.id).catch(() => {
            return true
          })
        return true
      })
      .catch(() => {
        redirect('/')
        return false
      })
  },
  computed: {
    isJoined(): boolean {
      return !!Object.keys(this.$room.info).length
    },
  },
})
</script>

<style scoped>
.container {
  @apply relative;
  @apply flex flex-wrap content-start justify-center items-start;
  @apply w-10/12 max-w-lg;
  min-height: 95vh;
  @apply my-3 mx-auto pb-2;
  @apply text-center;
  @apply rounded-sm;
  border-width: 5px;
  border-color: #fcd7b1;
  background-color: #d5a172;
  background-image: url('/images/bg-cork.jpg');
  background-size: 100% auto;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.3),
    0px 0px 3px 3px rgba(0, 0, 0, 0.2) inset;
}

.header {
  @apply w-full h-auto;
  @apply mx-auto;
}

.header .wrap {
  @apply w-full my-0 mx-auto;
  max-width: 69em;
}
.header-logo {
  @apply w-full mx-auto text-red-600;
  filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.4));
}

.room-container {
  @apply flex flex-wrap content-start justify-center items-start;
  @apply w-full max-w-2xl;
  min-height: 95vh;
  @apply mx-auto;
  @apply text-center;
}
</style>
