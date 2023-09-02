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
        return `Insira um ${name} válido.`;
    }

    return false;
};
const textValidate = (rule, name, value) => {
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
module.exports = validateEntrace; 