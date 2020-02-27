<template lang="pug">
  div
    .header
      .headercontainer
        a
            img.navbar-brand(src="http://alex.alex-p.aws.nl.eu.abnamro.com/img/logos/a-lex_logo.png")
   
        .links
          a.link(href='#') Collections
          a.link(href="http://alex.alex-p.aws.nl.eu.abnamro.com/terms") Terms
        
        .reg
          a.link(href='http://alex.alex-p.aws.nl.eu.abnamro.com/register') Register
          a.link(href="http://alex.alex-p.aws.nl.eu.abnamro.com/register") Login

    nuxt
  
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 15px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.header {
  background-color: #2c3e50;
  height: 60px;
}
.navbar-brand {
  height: 54px;
  padding: 14px 0px 6px 0px;
  margin: 0px 10px;
}
img.alex {
  height: 100%;
}
.headercontainer {
  max-width: 1140px;
  margin: auto;
  position: relative;
}
.links {
  display: inline-block;
  padding: 22px 15px;
  vertical-align: top;
}
.link,
.reg {
  text-decoration: none;
  color: #fff;
  padding: 0px 15px;
  vertical-align: top;
}
.reg {
  position: absolute;
  top: 0px;
  right: -30px;
  display: inline-block;
  padding: 22px 15px 22px 0px;
  vertical-align: top;
}
.link:hover {
  color: #18bc9c;
}
</style>
