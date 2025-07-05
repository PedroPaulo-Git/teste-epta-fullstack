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
 * Tipo de toast (sucesso ou erro)
 * Usado em: Componente Toast, hook useToast
 */
export type ToastType = "success" | "error";

/**
 * Props do componente Toast
 * Usado em: Componente Toast, páginas de auth
 */
export type ToastProps = {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
};

/**
 * Estado interno do Toast
 * Usado em: Hook useToast, páginas de auth
 */
export type ToastState = {
  message: string;
  type: ToastType;
  isVisible: boolean;
};

/**
 * Props do componente Toast (legado - usado nos modais)
 * Usado em: Todos os modais (VehicleModal, EditVehicleModal, etc.)
 */
export type LegacyToastProps = {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
};

/**
 * Estado interno do Toast (legado - usado nos modais)
 * Usado em: Todos os modais (VehicleModal, EditVehicleModal, etc.)
 */
export type LegacyToastState = {
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
  searchTerm: string;                           // Termo de pesquisa
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
