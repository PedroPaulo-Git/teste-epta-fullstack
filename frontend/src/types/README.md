# 📋 Organização dos Tipos TypeScript

Este documento explica a organização e uso dos tipos TypeScript no projeto.

## 🎯 **Objetivo**

Centralizar todos os tipos TypeScript em um local organizado para:
- **Manutenibilidade**: Mudanças em um só lugar
- **Consistência**: Mesmas definições em todo o projeto
- **Documentação**: Comentários explicativos para cada tipo
- **Reutilização**: Evitar duplicação de código

## 📁 **Estrutura dos Tipos**

### 🚗 **Entidades Principais**
- **`Vehicle`**: Representa um veículo no sistema
- **`User`**: Representa um usuário autenticado

### 🔐 **Autenticação**
- **`AuthResponse`**: Resposta de login/registro

### 🎨 **Componentes UI**
- **`ToastProps`**: Props do componente Toast
- **`ToastState`**: Estado interno do Toast nos modais

### 📦 **Estados dos Modais**
- **`ModalState`**: Estado unificado dos modais de veículos

### 🔍 **Filtros e Ordenação**
- **`FilterState`**: Estado dos filtros da tabela

### 🧩 **Props dos Componentes**
- **`HeaderManagerProps`**: Props do HeaderManager

## 📍 **Destino de Cada Tipo**

### `Vehicle`
**Usado em:**
- `VehicleTableDashboard.tsx` - Tabela principal
- `EditVehicleModal.tsx` - Modal de edição
- `DeleteVehicleModal.tsx` - Modal de exclusão
- `ArchiveVehicleModal.tsx` - Modal de arquivamento
- `VehicleModal.tsx` - Modal de criação

### `User`
**Usado em:**
- `HeaderManager.tsx` - Exibição do nome do usuário
- `HeaderModalUserEdit.tsx` - Modal de edição de perfil
- `useAuth.ts` - Hook de autenticação
- `AuthLoginPage.tsx` - Página de login
- `AuthRegisterPage.tsx` - Página de registro

### `AuthResponse`
**Usado em:**
- `AuthLoginPage.tsx` - Resposta do login
- `AuthRegisterPage.tsx` - Resposta do registro
- `api.ts` - Interceptors de autenticação

### `ToastProps` & `ToastState`
**Usado em:**
- `Toast.tsx` - Componente de notificação
- Todos os modais para feedback do usuário

### `ModalState`
**Usado em:**
- `VehicleTableDashboard.tsx` - Controle de todos os modais

### `FilterState`
**Usado em:**
- `VehicleTableDashboard.tsx` - Filtros e ordenação

### `HeaderManagerProps`
**Usado em:**
- `HeaderManager.tsx` - Props do componente
- `ManagerDashboard.tsx` - Passagem de dados

## 🔄 **Fluxo de Dados**

```
ManagerDashboard
    ↓ (HeaderManagerProps)
HeaderManager
    ↓ (User)
useAuth Hook
    ↓ (AuthResponse)
API Services
```

```
VehicleTableDashboard
    ↓ (Vehicle[], FilterState, ModalState)
Modais de Veículos
    ↓ (ToastState)
Toast Component
```

## 📝 **Convenções de Nomenclatura**

- **Entidades**: PascalCase (`Vehicle`, `User`)
- **Estados**: PascalCase + "State" (`ModalState`, `FilterState`)
- **Props**: PascalCase + "Props" (`HeaderManagerProps`, `ToastProps`)
- **Respostas**: PascalCase + "Response" (`AuthResponse`)

## 🚀 **Como Adicionar Novos Tipos**

1. **Identifique a categoria** (Entidades, UI, Estados, etc.)
2. **Adicione comentários** explicando o uso
3. **Documente os destinos** onde será usado
4. **Siga as convenções** de nomenclatura
5. **Atualize este README** se necessário

## 💡 **Boas Práticas**

- ✅ **Sempre importar** de `@/types` ou `../../types`
- ✅ **Usar comentários** para explicar o propósito
- ✅ **Manter organizado** por categorias
- ✅ **Evitar duplicação** de tipos similares
- ❌ **Não criar tipos** locais em componentes
- ❌ **Não usar `any`** sem justificativa 