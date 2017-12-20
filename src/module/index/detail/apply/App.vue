<template lang="html">
  <div>
  	<h2>{{msg}}</h2>
  	<div><a href="index.html">go index</a></div>
  	<div><a href="personal.html">go personal</a></div>
  	<div><a href="detail.html">go detail</a></div>
  	<div><a href="test.html">go test</a></div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			msg: 'apply哈哈'
		}
	}
}
</script>

<style lang="sass">
h2
	color: green
</style>
