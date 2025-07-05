import { Vehicle } from '../types';

/**
 * Serviço de pesquisa para veículos
 * Permite pesquisar por nome do modelo ou placa
 */
export class SearchService {
  /**
   * Pesquisa veículos por nome do modelo ou placa
   * @param vehicles - Lista de veículos para pesquisar
   * @param searchTerm - Termo de pesquisa (nome ou placa)
   * @returns Lista de veículos que correspondem à pesquisa
   */
  static searchVehicles(vehicles: Vehicle[], searchTerm: string): Vehicle[] {
    if (!searchTerm.trim()) {
      return vehicles; // Retorna todos se não houver termo de pesquisa
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    return vehicles.filter(vehicle => {
      const modelMatch = vehicle.model.toLowerCase().includes(normalizedSearchTerm);
      const plateMatch = vehicle.plate.toLowerCase().includes(normalizedSearchTerm);
      
      return modelMatch || plateMatch;
    });
  }

  /**
   * Pesquisa veículos com filtros adicionais
   * @param vehicles - Lista de veículos para pesquisar
   * @param searchTerm - Termo de pesquisa
   * @param statusFilter - Filtro por status (opcional)
   * @returns Lista de veículos filtrados
   */
  static searchVehiclesWithFilters(
    vehicles: Vehicle[], 
    searchTerm: string, 
    statusFilter: string = 'all'
  ): Vehicle[] {
    let filteredVehicles = vehicles;

    // Aplicar filtro de status primeiro
    if (statusFilter !== 'all') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.status === statusFilter);
    }

    // Aplicar pesquisa
    return this.searchVehicles(filteredVehicles, searchTerm);
  }

  /**
   * Pesquisa veículos com ordenação
   * @param vehicles - Lista de veículos para pesquisar
   * @param searchTerm - Termo de pesquisa
   * @param sortBy - Critério de ordenação ('name' ou 'status')
   * @returns Lista de veículos pesquisados e ordenados
   */
  static searchAndSortVehicles(
    vehicles: Vehicle[], 
    searchTerm: string, 
    sortBy: 'name' | 'status' = 'name'
  ): Vehicle[] {
    const searchedVehicles = this.searchVehicles(vehicles, searchTerm);

    return searchedVehicles.sort((a, b) => {
      if (sortBy === 'name') {
        return a.model.localeCompare(b.model);
      } else {
        return a.status.localeCompare(b.status);
      }
    });
  }
} 