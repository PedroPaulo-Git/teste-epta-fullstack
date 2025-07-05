# Schemas de Validação com Zod

Este diretório contém os schemas de validação usando a biblioteca Zod para garantir a integridade dos dados.

## Schemas Disponíveis

### `authSchemas.ts`

#### `registerSchema`
Valida dados de registro de usuário:
- **name**: 2-50 caracteres, apenas letras e espaços
- **email**: formato válido, 5-100 caracteres, convertido para minúsculas
- **password**: 6-100 caracteres, deve conter maiúscula, minúscula e número

#### `loginSchema`
Valida dados de login:
- **email**: formato válido, convertido para minúsculas
- **password**: obrigatório

#### `updateProfileSchema`
Valida atualização de perfil:
- **name**: 2-50 caracteres, apenas letras e espaços

## Como Usar

### 1. Importar o schema
```typescript
import { registerSchema } from '../schemas/authSchemas';
```

### 2. Usar no middleware
```typescript
router.post('/register', validateRequest(registerSchema), registerController);
```

### 3. Tipos TypeScript
```typescript
import { RegisterInput } from '../schemas/authSchemas';

const userData: RegisterInput = {
  name: 'João Silva',
  email: 'joao@email.com',
  password: 'Senha123'
};
```

## Benefícios

✅ **Validação Automática**: Dados são validados antes de chegar no controller
✅ **Tipos TypeScript**: Tipagem automática dos dados validados
✅ **Mensagens de Erro**: Erros formatados e claros
✅ **Sanitização**: Dados são limpos automaticamente (trim, toLowerCase)
✅ **Segurança**: Validação robusta contra dados maliciosos
✅ **Reutilização**: Schemas podem ser usados em múltiplas rotas

## Exemplo de Resposta de Erro

```json
{
  "message": "Dados inválidos",
  "errors": [
    {
      "field": "email",
      "message": "E-mail inválido"
    },
    {
      "field": "password",
      "message": "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    }
  ]
}
``` 