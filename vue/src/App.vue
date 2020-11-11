<template>
  <div id="app">
      <Show/>
    <header>
      <img
        src="https://github.com/Leecason/element-tiptap/raw/master/examples/assets/logo_for_github.png?raw=true"
        height="50"
        class="logo"
      >
      
      <iframe
        src="https://ghbtns.com/github-btn.html?user=Leecason&repo=element-tiptap&type=star&count=true"
        frameborder="0"
        scrolling="0"
        width="95"
        height="20px"
      ></iframe>
    </header>

    <Editor/>
  </div>
</template>

<script>
import Editor from "./components/Editor";
import Show from "./components/Sub";

export default {
  name: "App",
  components: {
    Editor,
    Show
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 40px;
}

header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
}
</style>
