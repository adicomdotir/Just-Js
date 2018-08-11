function truncateString(str, num) {
  // Clear out that junk in your trunk
  let splitStr = str.split("");

  if(num>=str.length)
    return str;

  let newStr="";
  for(let i=0;i<num;i++){
    newStr+=splitStr[i];
  }

  return newStr+="...";

}

truncateString("A-tisket a-tasket A green and yellow basket", 8);
