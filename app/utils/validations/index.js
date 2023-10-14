const defaultRule = {
    lengthMax: 999999,
    required: true,
    length: 3,
    type: 'text',
}

const validateEntrace = (name, value, rule = defaultRule) => {
    switch (rule.type) {
        case 'email':
            return emailValidate(rule, value, name);            
        case 'cpf':
            return validarCPF(rule, value, name);        
        case 'name':
            return validateName(rule, value, name);
        case 'text':
            return textValidate(rule, value, name);
        default:
            return textValidate(rule, value, name);
    }
};
const emailValidate = (rule, value, name) => {
    if (rule.required) {
        if (value.trim('').split('').length == 0) {
            return {erro_code: 400, message: `O campo ${name} é obrigatório.`};
        }
    }
    const user = value.substring(0, value.indexOf('@'));
    const domain = value.substring(value.indexOf('@') + 1, value.length);
    // essse algoritomo valida se o email é valido, por isso, estamos negando a equação,
    // precisamos saber se o email é inválido
    if (!(
        (user.length >= 1) &&
        (domain.length >= 3) &&
        (user.search('@') == -1) &&
        (domain.search('@') == -1) &&
        (user.search(' ') == -1) &&
        (domain.search(' ') == -1) &&
        (domain.search('.') != -1) &&
        (domain.indexOf('.') >= 1) &&
        (domain.lastIndexOf('.') < domain.length - 1))) {
        return {erro_code: 400, message: `Insira um ${name} válido.`};
    }

    return false;
};
const textValidate = (rule, value, name) => {
    if (value == undefined) {
        return {erro_code: 400, message: `O campo ${name} é obrigatório.`};
    }
    if (rule.required) {
        if (value.trim('').split('').length == 0) {
            return {erro_code: 400, message: `O campo ${name} é obrigatório.`};
        }
    }
    if (value.trim('').split('').length > 0 && rule.length) {
        if (rule.length > value.split('').length) {
            return { erro_code: 400, message: `Por favor, forneça ao menos ${rule.length} caracteres.` };
        }
    }
    if (value.trim('').split('').length > 0 && rule.lengthMax) {
        if (rule.lengthMax < value.split('').length) {
            return { erro_code: 400, message: `Por favor, forneça até ${rule.lengthMax} caracteres.` };
        }
    }
    return false;
};
const validateName = (rule, value, name) => {
    // Verificar se o nome é uma string
    if (typeof value !== 'string') {
      return { erro_code: 400, message: 'forneça um nome válido' };
    }
  
    // Verificar se o nome contém apenas letras e espaços
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        return { erro_code: 400, message: 'forneça um nome válido' };
    }
  
    // Verificar se o nome não está em branco
    if (value.trim() === '') {
        return { erro_code: 400, message: 'forneça um nome válido' };
    }
  
    // Se todas as verificações passarem, considerar o nome válido
    return false;
  }
const validarCPF = (rule, value, name) => {
    // Remover caracteres não numéricos
    value = value.replace(/\D/g, '');
  
    // Verificar se o value possui 11 dígitos
    if (value.length !== 11) {
        return { erro_code: 400, message: 'verifique seu CPF, ele é inválido' };
    }
  
    // Verificar values com dígitos repetidos (ex: 000.000.000-00)
    if (/^(\d)\1+$/.test(value)) {
        return { erro_code: 400, message: 'verifique seu CPF, ele é inválido' };
    }
  
    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(value.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
  
    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(value.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
  
    // Verificar se os dígitos verificadores são válidos
    if (parseInt(value.charAt(9)) === digitoVerificador1 && parseInt(value.charAt(10)) === digitoVerificador2) {
        return false;
    } else {
        return { erro_code: 400, message: 'verifique seu CPF, ele é inválido' };
    }
  }
  
  
module.exports = validateEntrace; 