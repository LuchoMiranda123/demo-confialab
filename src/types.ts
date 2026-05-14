export type Categoria =
  | 'hematologia'
  | 'bioquimica'
  | 'inmunologia'
  | 'microbiologia'
  | 'parasitologia'
  | 'hormonal'
  | 'toxicologia'
  | 'genetica'
  | 'vacuna'
  | 'perfil';

export type TipoServicio = 'analisis' | 'vacuna' | 'perfil';

export type ExamenTag = 'mas-pedido' | 'nuevo' | 'oferta' | 'rapido';

export interface PreAnalitica {
  ayuno: string;
  condiciones: string[];
  muestra: string;
  volumen: string;
  temperatura: string;
}

export interface Examen {
  codigo: string;
  nombre: string;
  categoria: Categoria;
  tipo: TipoServicio;
  precio: number;
  tiempoEntrega: string;
  tags: ExamenTag[];
  descripcion: string;
  preAnalitica: PreAnalitica;
  paraQueSimple: string;
  cuandoPedirlo: string;
}

export interface Perfil {
  codigo: string;
  nombre: string;
  precio: number;
  precioRegular: number;
  descripcion: string;
  imagen: string;
  examenes: string[]; // codigos de exámenes incluidos
  tags: ExamenTag[];
}

export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  distrito: string;
  telefono: string;
  whatsapp: string;
  mapsUrl: string;
  horarios: {
    lunVie: { open: string; close: string };
    sab: { open: string; close: string } | null;
    dom: { open: string; close: string } | null;
  };
  servicios: string[];
  imagen: string;
}

export interface BlogPost {
  slug: string;
  titulo: string;
  resumen: string;
  imagen: string;
  fecha: string;
  categoria: string;
  contenido: string;
}

export interface QuoteItem {
  codigo: string;
  nombre: string;
  precio: number;
  tipo: TipoServicio;
}
