export type T_Part = {
  id: number;
  image?: string | null | undefined;
  part_name: string;
  active_add?: boolean | undefined;
  quantity?: number;
  specification: string;
  oem_number: string;
  short_description?: string | undefined;
  set_composition?: string | undefined;
  dimensions: string;
  weight: number;
};


export type T_Shipment = {
  id: string
  status: E_ShipmentStatus
  creation_date: string
  formation_date: string
  planned_date: string
  completion_date: string
  storage: string
  operation_type: boolean
  moderator: string
  owner: string
  license_plate_number: string
  parts: T_Part[]
}

export enum E_ShipmentStatus {
  Draft=1,
  InWork,
  Completed=4,
  Rejected,
  Deleted
}

export type T_User = {
  id: number
  username: string
  email: string
  password: string,
  is_authenticated: boolean
  validation_error: boolean
  validation_success: boolean
  checked: boolean
  first_name: string
  last_name: string
}

export type T_LoginCredentials = {
  username: string
  password: string
}

export type T_RegisterCredentials = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export type T_PartsListResponse = {
  parts: T_Part[],
  draft_shipment_id: number,
  parts_amount: number
}