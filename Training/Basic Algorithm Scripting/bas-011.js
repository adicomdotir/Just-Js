function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(' ')
            .map(
              s => s.charAt(0).toUpperCase() + s.substr(1)
            ).join(' ');
  console.log(str);
  return str;
}

titleCase("I'm a little tea pot");
