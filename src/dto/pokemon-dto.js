export class PokemonQueryParams {
  page = 1;
  size = 10;
  sortBy = 'id';
  sortType = 'asc';
  search = '';
  type = '';
};

export class PokemonBodyRequest {
  name = '';
  type = [];
  description = '';
  image = '';
  monster_category = '';
  base_stats = {
    hp: 0,
    speed: 0,
    def: 0,
    attack: 0
  };
};

export class PokemonListResponse {
  setResponse = (arr = []) => {
    const result = arr.map(data => {
      return {
        id: data.id,
        name: data.name,
        monster_category: data.monster_category,
        type: data.type,
        image: data.image,
        is_captured: !!data.id_captured_pokemon,
      };
    })
    return result;
  }
};

export class PokemonDetailResponse {
  setResponse = (data = {}) => {
    return {
      id: data.id,
      name: data.name,
      monster_category: data.monster_category,
      type: data.type,
      base_stats: data.base_stats,
      description: data.description,
      image: data.image,
      is_captured: !!data.id_captured_pokemon,
    };
  }
};
