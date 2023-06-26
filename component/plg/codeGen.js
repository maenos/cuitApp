function generateCode() {
  const length = 10;
  let code = '';

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    code += digit;
  }

  return code;
}

// Exemple d'utilisation : générer un code à 10 chiffres

export default generateCode();;
