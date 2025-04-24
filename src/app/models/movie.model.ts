export interface Movie {
    title: string;
    release_year: number;
    location: string;
    fun_facts?: string;
    production_company?: string;
    distributor?: string;
    director: string;
    writer: string;
    actor_1?: string | string[];
    actor_2?: string;
    actor_3?: string;
    point?: string;
    lng: number;
    lat: number;
    analysis_neighborhood: string;
    supervisor_district?: string;
    data_as_of?: string;
    data_loaded_at?: string;
}