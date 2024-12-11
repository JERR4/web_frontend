import { api } from '.././api'

export interface Part {
  id: number;
  part_name: string;
  specification: string;
  oem_number: string;
  image: string;
  short_description: string;
  set_composition: string;
  dimensions: string;
  weight: number;
}

export interface PartResult {
  parts: Part[];
}

const getApiUrl = () => {
  return window.location.hostname;
}

export const getPartsByName = async (name = ""): Promise<PartResult> => {
  try {
    const response = await api.parts.partsSearchList({ part_name: name });

    return {
      parts: Array.isArray(response.data.parts)
        ? (response.data.parts as Part[]).map((part: Part) => {
            const apiUrl = getApiUrl();
            part.image = part.image.replace("localhost", apiUrl);
            return part;
          })
        : [],
    };
  } catch (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }
};


export const getPartById = async (partId: number | string): Promise<Part> => {
  try {
    const response = await api.parts.partsRead(partId.toString());
    const part: Part = response.data as Part;

    const apiUrl = getApiUrl();
    part.image = part.image.replace('localhost', apiUrl);

    return part;
  } catch (error) {
    console.error("Error fetching part by ID:", error);
    throw error;
  }
};

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginUser = async (data: LoginRequest) => {
  try {
    await api.users.usersLoginCreate(data);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


