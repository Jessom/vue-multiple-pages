<template lang="html">
  <div>
  	<h2>{{msg}}</h2>
  	<div><a href="index.html">go index</a></div>
  	<div><a href="personal.html">go personal</a></div>
  	<div><a href="apply.html">go apply</a></div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			msg: '我是detail'
		}
	}
}
</script>

<style lang="sass">
h2
	color: red
</style>
