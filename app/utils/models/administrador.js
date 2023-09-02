const defaultRule = {
    lengthMax: 999999,
    required: true,
    length: 3,
    type: 'text',
}
module.exports [
    { name: 'nome', rule: defaultRule },{ name: 'email', rule: {...defaultRule, type: 'email'} }, { name:'cpf', rule: defaultRule }
]