// ============================================================================
// TIPOS DE ENTIDADES PRINCIPAIS
// ============================================================================

/**
 * Representa um veículo no sistema
 * Usado em: VehicleTableDashboard, modais de veículos, filtros
 */
export type Vehicle = {
  id: string;
  model: string;
  plate: string;
  status: string;
};

/**
 * Representa um usuário autenticado
 * Usado em: HeaderManager, modais de perfil, hooks de autenticação
 */
export type User = {
  id: string;
  name: string;
  email: string;
};

// ============================================================================
// TIPOS DE AUTENTICAÇÃO
// ============================================================================

/**
 * Resposta de autenticação (login/registro)
 * Usado em: Páginas de login/registro, serviços de API
 */
export type AuthResponse = {
  token: string;
  user: User;
};

// ============================================================================
// TIPOS DE COMPONENTES UI
// ============================================================================

/**
 * Props do componente Toast
 * Usado em: Componente Toast, todos os modais
 */
export type ToastProps = {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
};

/**
 * Estado interno do Toast (usado nos modais)
 * Usado em: Todos os modais (VehicleModal, EditVehicleModal, etc.)
 */
export type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

// ============================================================================
// TIPOS DE ESTADO DOS MODAIS
// ============================================================================

/**
 * Estado unificado dos modais de veículos
 * Usado em: VehicleTableDashboard
 */
export type ModalState = {
  create: boolean;        // Modal de criação
  edit: boolean;          // Modal de edição
  archive: boolean;       // Modal de arquivamento
  delete: boolean;        // Modal de exclusão
  selectedVehicle: Vehicle | null;  // Veículo selecionado para ação
  openDropdownId: string | null;    // ID do dropdown aberto (mobile)
};

// ============================================================================
// TIPOS DE FILTROS E ORDENAÇÃO
// ============================================================================

/**
 * Estado dos filtros da tabela de veículos
 * Usado em: VehicleTableDashboard
 */
export type FilterState = {
  sortBy: "name" | "status";                    // Critério de ordenação
  statusFilter: "all" | "active" | "inactive";  // Filtro por status
  isOpen: boolean;                              // Dropdown de filtro aberto
};

// ============================================================================
// TIPOS DE PROPS DOS COMPONENTES
// ============================================================================

/**
 * Props do componente HeaderManager
 * Usado em: HeaderManager, ManagerDashboard
 */
export type HeaderManagerProps = {
  ativos: number;    // Quantidade de veículos ativos
  inativos: number;  // Quantidade de veículos inativos
  total: number;     // Total de veículos
};
