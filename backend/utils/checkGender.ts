export default function checkGender(name: string) {
  const lastLetter = name.charAt(name.length - 1).toLowerCase();

  if (lastLetter === 'a') {
    return 'women';
  } else {
    return 'men';
  }
}
