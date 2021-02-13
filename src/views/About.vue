<template>
  <div class="about pa-6">
    <h1 class="mb-2">About {{ $store.state.appTitle }}</h1>
    <p>
      <b>Task manager</b> is the best app ever to help you manage your daily tasks.
      <br/>From a simple grocery list to a more complex project - we've got you covered! 👍
    </p>
    <p>
      Need to make some notes? Just create a new <b>Tasks List</b> and add some <b>Tasks</b>.
      It can't be simplier than that!
    </p>
    <p>Task Manager provides all the funcionality you might seek.
      <ul>
        <li>Add task</li>
        <li>Edit task</li>
        <li>Set tas due date</li>
        <li>Delete task</li>
      </ul>
      What else could you possibly need? 🤔
    </p>
    <p>
      Keep your tasks organised within dedicated Lists and stay on top of Your game!
    </p>
    
    <p class='last'>&copy; Created by <b>Michal Uzdowski</b> - 2021</p>
  </div>
</template>

<style scoped lang="sass">
.last
  position: absolute
  bottom: 3px
</style>
